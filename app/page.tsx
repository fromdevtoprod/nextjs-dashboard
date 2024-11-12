import { useTranslations } from 'next-intl';
import { Header } from './landing-page/header';
import { HeroSection } from './landing-page/hero-section';
import { FeaturesSection } from './landing-page/features-section';
import { DemoSection } from './landing-page/demo-section';
import { FaqSection } from './landing-page/faq-section';
import { CommonIssuesSection } from './landing-page/common-issues-section';
import { TestimonialsSection } from './landing-page/testimonials-section';
import { PricingSection } from './landing-page/pricing-section';
import { Footer } from './landing-page/footer';

export default function Page() {
  const t = useTranslations('LandingPage');
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F4E3] text-[#2C3E50]">
      <Header />
      <main className="flex-1">
        <HeroSection
          buttonLabel={t('buttons.startFreeTrial')}
          subtitle={t('subtitle')}
          title={t('title')}
        />
        <FeaturesSection title={t('features.title')} />
        <DemoSection
          goal={t('demo.goal')}
          hello={t('demo.hello')}
          introduction={t('demo.introduction')}
          title={t('demo.title')}
          thanks={t('demo.thanks')}
        />
        <FaqSection
          items={[
            {
              answer: t('faq.item1.answer'),
              question: t('faq.item1.question'),
            },
            {
              answer: t('faq.item2.answer'),
              question: t('faq.item2.question'),
            },
            {
              answer: t('faq.item3.answer'),
              question: t('faq.item3.question'),
            },
            {
              answer: t('faq.item4.answer'),
              question: t('faq.item4.question'),
            },
            {
              answer: t('faq.item5.answer'),
              question: t('faq.item5.question'),
            },
          ]}
          title={t('faq.title')}
        />
        <CommonIssuesSection
          items={[
            {
              answer: t('commonIssues.item1.answer'),
              question: t('commonIssues.item1.question'),
            },
            {
              answer: t('commonIssues.item2.answer'),
              question: t('commonIssues.item2.question'),
            },
            {
              answer: t('commonIssues.item3.answer'),
              question: t('commonIssues.item3.question'),
            },
            {
              answer: t('commonIssues.item4.answer'),
              question: t('commonIssues.item4.question'),
            },
            {
              answer: t('commonIssues.item5.answer'),
              question: t('commonIssues.item5.question'),
            },
            {
              answer: t('commonIssues.item6.answer'),
              question: t('commonIssues.item6.question'),
            },
          ]}
          title={t('commonIssues.title')}
        />
        <TestimonialsSection
          testimonials={[
            {
              author: 'Johanna G.',
              job: 'Praticienne en drainage lymphatique',
              quote:
                "En tant que praticienne dans le domaine du bien-être, j'adore la façon dont ZenAgenda m'aide à rester organisée et concentrée sur le parcours de bien-être de mes clients.",
            },
            {
              author: 'Mathieu C.',
              job: 'Diététicien',
              quote:
                'ZenAgenda a transformé la façon dont je gère ma pratique au quotidien. Il est intuitif et conçu pour les professionnels du bien-être.',
            },
            {
              author: 'Elisabeth R.',
              job: 'Coach en développement personnel',
              quote:
                'Le système de notes intégré a considérablement rationalisé mon flux de travail.',
            },
          ]}
          title={t('testimonials.title')}
        />
        <PricingSection
          buttonLabel={t('pricing.button')}
          plans={[
            {
              name: 'Offre Essentielle',
              price: '15€/mois',
              features: [
                'Essai gratuit de 30 jours',
                'Gain de temps précieux',
                'Conçue spécialement pour le bien-être',
                'Suivi et personnalisation client',
                'Service client dédié',
                'Flexibilité et liberté',
                'Mises à jour régulières et nouvelles fonctionnalités',
              ],
            },
          ]}
          title={t('pricing.title')}
        />
      </main>
      <Footer />
    </div>
  );
}
