import {
  Calendar,
  HandCoins,
  NotebookPen,
  Gauge,
  MessageCircleQuestion,
  ChartNoAxesColumn,
} from 'lucide-react';

type FeaturesSectionProps = {
  title: string;
};

export function FeaturesSection({ title }: FeaturesSectionProps) {
  return (
    <section className="w-full py-4 md:py-6 lg:py-8" id="features">
      <div className="px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#7C9885] sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Calendar,
              title: 'Gestion facile des rendez-vous',
              description:
                'Planifiez, reprogrammez, et organisez vos séances sans tracas. Fini les oublis et les erreurs : tout est centralisé pour simplifier votre emploi du temps.',
            },
            {
              icon: NotebookPen,
              title: 'Suivi des soins',
              description: `Gardez un œil sur le parcours de chaque client avec un suivi précis de leurs cures et de leurs rendez-vous. Visualisez d’un coup d'œil où en est chaque traitement pour une expérience client optimisée.`,
            },
            {
              icon: HandCoins,
              title: 'Suivi des paiements simplifié',
              description:
                'Gardez une trace de chaque paiement, visualisez les règlements en attente et assurez-vous que tous vos services sont bien facturés et à jour, sans effort supplémentaire.',
            },
            {
              icon: Gauge,
              title: 'Tableau de bord intuitif',
              description:
                'Accédez à une vue d’ensemble claire de votre activité. Retrouvez toutes vos informations importantes en un coup d’œil pour une gestion rapide et efficace.',
            },
            {
              icon: MessageCircleQuestion,
              title: 'Service client dédié',
              description:
                'Profitez d’un support attentif et réactif, spécialement formé pour comprendre les besoins des professionnels du bien-être.',
            },
            {
              icon: ChartNoAxesColumn,
              title: 'Statistiques et graphiques (bientôt disponible)',
              description:
                'Suivez l’évolution de vos revenus et de votre clientèle grâce à des graphiques et statistiques personnalisés, pour mieux comprendre et développer votre activité.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg"
            >
              <feature.icon className="mb-4 h-12 w-12 text-[#7C9885]" />
              <h3 className="mb-2 text-xl font-bold text-[#2C3E50]">
                {feature.title}
              </h3>
              <p className="text-[#2C3E50]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
