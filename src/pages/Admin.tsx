import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Users, FileText, LogOut, Plus, Edit, Trash2, Download } from "lucide-react";
import { db, Evento, Presenca } from "@/services/db";
import { toast } from "sonner";
import { format } from "date-fns";

const Admin = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [showEventoDialog, setShowEventoDialog] = useState(false);
  const [showPresencasDialog, setShowPresencasDialog] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [selectedEventoPresencas, setSelectedEventoPresencas] = useState<Presenca[]>([]);
  
  const [formData, setFormData] = useState({
    titulo: "",
    data: "",
    local: "",
    descricao: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    initDB();
  }, [navigate]);

  const initDB = async () => {
    try {
      await db.init();
      loadData();
    } catch (error) {
      console.error("Erro ao inicializar DB:", error);
    }
  };

  const loadData = async () => {
    try {
      const [eventosData, presencasData] = await Promise.all([
        db.getEventos(),
        db.getPresencas(),
      ]);
      setEventos(eventosData);
      setPresencas(presencasData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast.success("Logout realizado com sucesso");
    navigate("/");
  };

  const handleSaveEvento = async () => {
    if (!formData.titulo || !formData.data || !formData.local || !formData.descricao) {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      if (selectedEvento?.id) {
        await db.updateEvento({ ...formData, id: selectedEvento.id });
        toast.success("Evento atualizado com sucesso");
      } else {
        await db.addEvento(formData);
        toast.success("Evento criado com sucesso");
      }
      
      await loadData();
      setShowEventoDialog(false);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      toast.error("Erro ao salvar evento");
    }
  };

  const handleEditEvento = (evento: Evento) => {
    setSelectedEvento(evento);
    setFormData({
      titulo: evento.titulo,
      data: evento.data,
      local: evento.local,
      descricao: evento.descricao,
    });
    setShowEventoDialog(true);
  };

  const handleDeleteEvento = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      await db.deleteEvento(id);
      await loadData();
      toast.success("Evento excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      toast.error("Erro ao excluir evento");
    }
  };

  const handleViewPresencas = async (evento: Evento) => {
    if (!evento.id) return;
    try {
      const presencasEvento = await db.getPresencasByEvento(evento.id);
      setSelectedEvento(evento);
      setSelectedEventoPresencas(presencasEvento);
      setShowPresencasDialog(true);
    } catch (error) {
      console.error("Erro ao carregar presenças:", error);
      toast.error("Erro ao carregar presenças");
    }
  };

  const handleExportCSV = () => {
    const csvData = eventos.map((evento) => {
      const presencasEvento = presencas.filter((p) => p.idEvento === evento.id);
      return {
        Título: evento.titulo,
        Data: evento.data,
        Local: evento.local,
        Descrição: evento.descricao,
        "Total Presenças": presencasEvento.length,
        Participantes: presencasEvento.map((p) => p.nomeUsuario).join("; "),
      };
    });

    const csv = [
      Object.keys(csvData[0] || {}).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cacadoras-hobbies-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Relatório exportado com sucesso");
  };

  const resetForm = () => {
    setFormData({ titulo: "", data: "", local: "", descricao: "" });
    setSelectedEvento(null);
  };

  const totalEventos = eventos.length;
  const totalPresencas = presencas.length;
  const proximosEventos = eventos.filter((e) => new Date(e.data) >= new Date()).length;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie eventos e presenças</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{totalEventos}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Presenças</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{totalPresencas}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{proximosEventos}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            onClick={() => {
              resetForm();
              setShowEventoDialog(true);
            }}
            className="bg-accent hover:bg-accent/90 flex items-center gap-2"
          >
            <Plus size={18} />
            Novo Evento
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={18} />
            Exportar Relatório
          </Button>
        </div>

        {/* Eventos List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Eventos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum evento cadastrado ainda
                </p>
              ) : (
                eventos.map((evento) => {
                  const presencasEvento = presencas.filter((p) => p.idEvento === evento.id);
                  return (
                    <div
                      key={evento.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
                    >
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="font-semibold text-foreground text-lg">{evento.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(evento.data + "T12:00:00"), "dd/MM/yyyy")} • {evento.local}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {presencasEvento.length} {presencasEvento.length === 1 ? "presença" : "presenças"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPresencas(evento)}
                        >
                          <Users size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEvento(evento)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => evento.id && handleDeleteEvento(evento.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evento Dialog */}
      <Dialog open={showEventoDialog} onOpenChange={setShowEventoDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvento ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título</label>
              <Input
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Nome do evento"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Data</label>
              <Input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Local</label>
              <Input
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                placeholder="Local do evento"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descrição do evento"
                rows={4}
              />
            </div>
            <Button onClick={handleSaveEvento} className="w-full bg-accent hover:bg-accent/90">
              {selectedEvento ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Presenças Dialog */}
      <Dialog open={showPresencasDialog} onOpenChange={setShowPresencasDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participantes</DialogTitle>
            <DialogDescription>{selectedEvento?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedEventoPresencas.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Nenhuma presença confirmada ainda
              </p>
            ) : (
              selectedEventoPresencas.map((presenca) => (
                <div
                  key={presenca.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <span className="font-medium">{presenca.nomeUsuario}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(presenca.dataConfirmacao), "dd/MM/yyyy HH:mm")}
                  </span>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
