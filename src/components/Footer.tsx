import { Link } from "react-router-dom";
import { Heart, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
const Footer = () => {
  return <footer className="bg-accent text-accent-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logo} alt="Caçadoras de Hobbies" className="h-16 w-16 animate-float" />
            <p className="text-sm text-center md:text-left opacity-90">
              Um espaço de conexões, trocas, amizades e autocuidado através da criatividade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-semibold text-lg mb-2">Links Rápidos</h3>
            <Link to="/" className="hover:opacity-80 transition-smooth">
              Home
            </Link>
            <Link to="/sobre" className="hover:opacity-80 transition-smooth">
              Sobre nós
            </Link>
            <Link to="/faq" className="hover:opacity-80 transition-smooth">
              FAQ
            </Link>
            <Link to="/agenda" className="hover:opacity-80 transition-smooth">
              Agenda
            </Link>
          </div>

          {/* Contato e Redes Sociais */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h3 className="font-semibold text-lg mb-2">Contato</h3>
            <p className="text-sm opacity-90">hilanalima.design@gmail.com</p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.instagram.com/cacadoras.de.hobbies/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-smooth" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@cacadora.de.hobbies" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-smooth" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90 mt-2">
              <span>Feito com</span>
              <Heart size={16} fill="currentColor" />
              <span>em 2025</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-accent-foreground/20 text-center">
          <p className="text-sm opacity-90">
            © Caçadoras de Hobbies – 2025. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;