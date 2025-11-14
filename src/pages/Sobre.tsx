import { Heart, Users, Palette, Sparkles } from "lucide-react";

const Sobre = () => {
  const features = [
    {
      icon: Heart,
      title: "Caçadoras de Hobbies",
      description:
        "Um projeto nascido da vontade pessoal de sair do piloto automático e criar espaços de conexão genuína através de atividades criativas e significativas.",
    },
    {
      icon: Users,
      title: "Refúgio seguro",
      description:
        "Mais do que encontros, criamos um ambiente acolhedor onde você pode ser você mesma, sem julgamentos, pressões ou expectativas. Aqui, o importante é estar presente.",
    },
    {
      icon: Palette,
      title: "Cuidar criando",
      description:
        "O autocuidado vai além de rotinas de beleza. É sobre dedicar tempo para descobrir o que te move, experimentar novos hobbies e se reconectar com sua criatividade.",
    },
    {
      icon: Sparkles,
      title: "Encontros que inspiram",
      description:
        "Nossos encontros são vivências reais que combinam arte, conversas autênticas e momentos de descontração. Cada encontro é uma oportunidade de aprender, criar e se conectar.",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Caçadoras de Hobbies,<br />
            uma vontade pessoal de sair<br />
            do piloto automático…
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E criar um espaço onde mulheres podem se encontrar, experimentar e se reconectar com o que realmente importa.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl shadow-card hover:shadow-soft transition-smooth animate-scale-in border border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-xl flex-shrink-0">
                    <Icon size={28} className="text-primary-foreground" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="gradient-primary p-12 rounded-3xl shadow-soft text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Nossa Missão
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
            Criar um movimento onde mulheres se reconectam com suas paixões, descobrem novos interesses e constroem amizades verdadeiras através de experiências criativas compartilhadas.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Acreditamos que o autocuidado é também sobre nutrir a criatividade, experimentar sem medo de errar e criar espaços onde podemos ser autênticas.
          </p>
        </div>

        {/* Values Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 animate-fade-in">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Acolhimento</h3>
            <p className="text-muted-foreground">
              Todos são bem-vindos, independente do nível de experiência
            </p>
          </div>
          <div className="text-center p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Criatividade</h3>
            <p className="text-muted-foreground">
              O processo criativo é mais importante que o resultado
            </p>
          </div>
          <div className="text-center p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Conexão</h3>
            <p className="text-muted-foreground">
              Construindo amizades verdadeiras através de experiências compartilhadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
