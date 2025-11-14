import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { db, Evento, Presenca } from "@/services/db";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import logo from "@/assets/logo.png";

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    initDB();
  }, []);

  const initDB = async () => {
    try {
      await db.init();
      loadEventos();
      loadPresencas();
    } catch (error) {
      console.error("Erro ao inicializar DB:", error);
      toast.error("Erro ao carregar eventos");
    }
  };

  const loadEventos = async () => {
    try {
      const data = await db.getEventos();
      setEventos(data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  };

  const loadPresencas = async () => {
    try {
      const data = await db.getPresencas();
      setPresencas(data);
    } catch (error) {
      console.error("Erro ao carregar presenças:", error);
    }
  };

  const getEventosForDate = (selectedDate: Date) => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return eventos.filter((e) => e.data === dateStr);
  };

  const hasPresencaForEvento = (eventoId: number) => {
    return presencas.some((p) => p.idEvento === eventoId);
  };

  const handleConfirmarPresenca = async () => {
    if (!selectedEvento?.id || !nomeUsuario.trim()) {
      toast.error("Por favor, preencha seu nome");
      return;
    }

    try {
      await db.addPresenca({
        idEvento: selectedEvento.id,
        nomeUsuario: nomeUsuario.trim(),
        dataConfirmacao: new Date().toISOString(),
      });

      await loadPresencas();
      setNomeUsuario("");
      setSelectedEvento(null);
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      toast.error("Erro ao confirmar presença");
    }
  };

  const handleAddToGoogleCalendar = (evento: Evento) => {
    const startDate = new Date(evento.data + "T10:00:00");
    const endDate = new Date(evento.data + "T12:00:00");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      evento.titulo
    )}&dates=${format(startDate, "yyyyMMdd'T'HHmmss")}/${format(
      endDate,
      "yyyyMMdd'T'HHmmss"
    )}&details=${encodeURIComponent(evento.descricao)}&location=${encodeURIComponent(
      evento.local
    )}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const modifiers = {
    booked: eventos.map((e) => new Date(e.data + "T12:00:00")),
    confirmed: eventos
      .filter((e) => e.id && hasPresencaForEvento(e.id))
      .map((e) => new Date(e.data + "T12:00:00")),
  };

  const modifiersStyles = {
    booked: { 
      backgroundColor: "hsl(var(--accent))",
      color: "white",
      fontWeight: "bold",
    },
    confirmed: {
      backgroundColor: "hsl(var(--secondary))",
      color: "white",
      fontWeight: "bold",
    },
  };

  const eventosDoDate = date ? getEventosForDate(date) : [];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-4 rounded-2xl">
              <CalendarIcon size={48} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Agenda de Encontros
          </h1>
          <p className="text-xl text-muted-foreground">
            Confira os próximos eventos e confirme sua presença
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card className="shadow-card animate-scale-in">
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className="rounded-md border-0 pointer-events-auto"
              />
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent"></div>
                  <span className="text-muted-foreground">Evento disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary"></div>
                  <span className="text-muted-foreground">Presença confirmada</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {date
                ? `Eventos em ${format(date, "d 'de' MMMM", { locale: ptBR })}`
                : "Selecione uma data"}
            </h2>

            {eventosDoDate.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhum evento agendado para esta data
                  </p>
                </CardContent>
              </Card>
            ) : (
              eventosDoDate.map((evento) => (
                <Card key={evento.id} className="shadow-card hover:shadow-soft transition-smooth">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {evento.titulo}
                    </h3>
                    
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span>{format(new Date(evento.data), "dd/MM/yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{evento.local}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users size={18} className="mt-1" />
                        <span>{evento.descricao}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedEvento(evento)}
                        className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                        disabled={evento.id ? hasPresencaForEvento(evento.id) : false}
                      >
                        {evento.id && hasPresencaForEvento(evento.id)
                          ? "Presença Confirmada ✓"
                          : "Participar desse dia"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleAddToGoogleCalendar(evento)}
                      >
                        + Google
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmar Presença Dialog */}
      <Dialog open={!!selectedEvento} onOpenChange={() => setSelectedEvento(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Presença</DialogTitle>
            <DialogDescription>
              {selectedEvento?.titulo}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Digite seu nome"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />
            <Button 
              onClick={handleConfirmarPresenca} 
              className="w-full bg-accent hover:bg-accent/90"
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Sucesso" className="h-24 w-24 animate-float" />
          </div>
          <DialogTitle className="text-2xl">Presença Confirmada!</DialogTitle>
          <DialogDescription className="text-lg">
            Estamos ansiosas para te ver no encontro! 🌟
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agenda;
