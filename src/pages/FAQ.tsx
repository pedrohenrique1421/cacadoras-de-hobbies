import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
const FAQ = () => {
  const faqs = [{
    question: "Como participar?",
    answer: "Para participar é super simples! Navegue até a página Agenda e veja os próximos encontros. Escolha o encontro que mais te interessa e clique em 'Participar desse dia'. Você receberá todas as informações necessárias sobre local, horário e materiais."
  }, {
    question: "Onde ocorrem os encontros?",
    answer: "Nossos encontros acontecem em diversos locais acolhedores e criativos. Pode ser em ateliês, cafés, espaços culturais ou ao ar livre. O local específico é informado na descrição de cada evento na agenda. Sempre escolhemos espaços que sejam acessíveis e confortáveis para todas."
  }, {
    question: "Precisa pagar?",
    answer: "A participação nos encontros é gratuita! Alguns eventos podem ter um custo opcional para materiais específicos ou consumação no local, mas isso será informado com antecedência. Nossa prioridade é que o aspecto financeiro não seja uma barreira para participar."
  }, {
    question: "Posso ir sozinha?",
    answer: "Com certeza! Na verdade, muitas participantes vêm sozinhas e é justamente nos encontros que fazem novas amizades. Nosso ambiente é super acolhedor e pensado para que todas se sintam à vontade, independente de virem acompanhadas ou não. Todas são bem-vindas!"
  }, {
    question: "Preciso ter experiência?",
    answer: "Não! Os encontros são pensados para todas, desde iniciantes até quem já tem experiência. O foco está no processo de criar e se conectar, não em ter habilidades prévias. O importante é estar aberta a experimentar e se divertir no processo."
  }, {
    question: "Qual é a faixa etária?",
    answer: "Não temos restrição de idade! Todas as mulheres adultas são bem-vindas. O que une o grupo é o interesse em descobrir novos hobbies, praticar autocuidado e fazer conexões genuínas, e isso não tem idade."
  }, {
    question: "Como funciona um encontro típico?",
    answer: "Cada encontro tem sua própria proposta, mas geralmente começamos com uma apresentação descontraída, seguida da atividade criativa do dia. Sempre há tempo para conversas, troca de experiências e, claro, muitas risadas. A atmosfera é leve e sem pressão - o importante é estar presente e aproveitar o momento."
  }, {
    question: "Posso sugerir atividades?",
    answer: "Sim! Adoramos receber sugestões das participantes. Se você tem algum hobby que gostaria de compartilhar ou uma atividade que gostaria de experimentar em grupo, entre em contato conosco. As melhores ideias vêm da própria comunidade!"
  }];
  return <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-4 rounded-2xl">
              <HelpCircle size={48} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o Caçadoras de Hobbies
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-scale-in">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-xl px-6 shadow-card hover:shadow-soft transition-smooth">
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-accent py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center gradient-primary p-8 rounded-2xl shadow-soft animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Ainda tem dúvidas?
          </h2>
          <p className="text-muted-foreground mb-4">
            Entre em contato conosco! Estamos sempre disponíveis para conversar.
          </p>
          <a href="mailto:contato@cacadorasdehobbies.com" className="text-accent font-semibold hover:underline"></a>
        </div>
      </div>
    </div>;
};
export default FAQ;