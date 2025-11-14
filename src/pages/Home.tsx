import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner-new.jpg";
import gallery1 from "@/assets/gallery-1-new.jpg";
import gallery2 from "@/assets/gallery-2-new.jpg";
import gallery3 from "@/assets/gallery-3-new.jpg";
import gallery4 from "@/assets/gallery-4-new.jpg";
import aboutImage from "@/assets/about-image-new.jpg";
const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryImages = [gallery1, gallery2, gallery3, gallery4];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % galleryImages.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Caçadoras de Hobbies
              </h1>
              <p className="text-xl text-muted-foreground">
                Um espaço acolhedor para descobrir novos hobbies, fazer amizades e praticar o autocuidado através da criatividade.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-soft transition-smooth hover:scale-105" onClick={() => navigate("/agenda")}>
                Participar
              </Button>
            </div>
            <div className="animate-scale-in">
              <img src={heroBanner} alt="Mulheres praticando hobbies juntas" className="rounded-3xl shadow-soft w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img src={aboutImage} alt="Descobrindo novos hobbies" className="rounded-full w-80 h-80 mx-auto object-cover shadow-card" />
            </div>
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Descubra o prazer de criar e conectar
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Caçadoras de Hobbies é um projeto que nasceu da vontade de sair do piloto automático e criar um espaço onde mulheres podem se encontrar, experimentar novos hobbies e praticar o autocuidado de forma leve e criativa.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aqui, você não precisa ser expert em nada. O importante é se permitir experimentar, errar, rir e se conectar com outras pessoas que também buscam mais leveza e criatividade no dia a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="gradient-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-semibold text-foreground italic max-w-4xl mx-auto animate-fade-in">"Aqui vamos ter conexões, trocas, amizades, autoconhecimento e muita arte."</blockquote>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground animate-fade-in">
            Nossos Encontros
          </h2>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <div className="flex transition-transform duration-500 ease-out" style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}>
                {galleryImages.map((img, idx) => <div key={idx} className="min-w-full">
                    <img src={img} alt={`Encontro ${idx + 1}`} className="w-full h-96 object-cover" />
                  </div>)}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-3 rounded-full shadow-card hover:bg-card transition-smooth hover:scale-110">
              <ChevronLeft size={24} className="text-foreground" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-3 rounded-full shadow-card hover:bg-card transition-smooth hover:scale-110">
              <ChevronRight size={24} className="text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, idx) => <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full transition-smooth ${currentSlide === idx ? "bg-accent w-8" : "bg-border"}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Autocuidado Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Autocuidado através da Criatividade
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Caçadoras de Hobbies não é apenas sobre aprender coisas novas. É sobre criar um refúgio seguro onde você pode desacelerar, se expressar e se conectar consigo mesma e com outras mulheres.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nossos encontros são momentos de pausa no meio da rotina corrida, onde o foco é o processo, não o resultado. É um espaço para experimentar sem julgamentos, criar sem pressão e se permitir simplesmente ser.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-8 px-8 py-6 shadow-soft transition-smooth hover:scale-105" onClick={() => navigate("/agenda")}>
            Ver Próximos Encontros
          </Button>
        </div>
      </section>
    </div>;
};
export default Home;