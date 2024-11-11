import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Calendar,
  CalendarHeart,
  Rocket,
  HandCoins,
  NotebookPen,
  Gauge,
  MessageCircleQuestion,
  ChartNoAxesColumn,
  Check,
  Star,
} from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  const t = useTranslations('LandingPage');
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F4E3] text-[#2C3E50]">
      <header className="flex h-16 items-center bg-white px-4 shadow-sm lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <CalendarHeart className="h-6 w-6 text-[#7C9885]" />
          <span className="ml-2 text-2xl font-bold text-[#7C9885]">
            ZenAgenda
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-[#7C9885]"
            href="#pricing"
          >
            Tarif
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#7C9885]"
            href="#demo"
          >
            Demo
          </Link>
          <Link className="text-sm font-medium hover:text-[#7C9885]" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-white to-[#F8F4E3] py-8 md:py-16 lg:py-24 xl:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-[#7C9885] sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t('title')}
                </h1>
                <p className="mx-auto max-w-[1000px] text-[#2C3E50] md:text-xl">
                  {t('subtitle')}
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  asChild
                  className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
                  size="lg"
                >
                  <Link href="/dashboard">
                    {t('buttons.startFreeTrial')}
                    <Rocket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {/* <Button
                  variant="outline"
                  className="border-[#7C9885] text-[#7C9885] hover:bg-[#7C9885] hover:text-white"
                  size="lg"
                >
                  Book a Demo
                  <CalendarCheck className="ml-2 h-5 w-5" />
                </Button> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-8">
          <div className="px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#7C9885] sm:text-4xl md:text-5xl">
              {t('features.title')}
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
        <section className="w-full bg-white py-12 md:py-24 lg:py-32" id="demo">
          <div className="px-4 md:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('demo.title')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  {t('demo.hello')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  {t('demo.introduction')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  {t('demo.goal')}
                </p>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  {t('demo.thanks')}
                </p>
              </div>
              <div className="aspect-video">
                <iframe
                  className="h-full w-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="CareSchedule Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-[#7C9885] py-12 text-white md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('faq.title')}
            </h2>
            <Accordion.Root
              type="single"
              collapsible
              className="mx-auto w-full max-w-3xl"
              defaultValue="item-1"
            >
              <Accordion.Item className="border-b" value="item-1">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                    {t('faq.item1.question')}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm">
                  <div className="pb-4 pt-0 text-lg">
                    {t('faq.item1.answer')}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item className="border-b" value="item-2">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                    {t('faq.item2.question')}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm">
                  <div className="pb-4 pt-0 text-lg">
                    {t('faq.item2.answer')}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item className="border-b" value="item-3">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                    {t('faq.item3.question')}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm">
                  <div className="pb-4 pt-0 text-lg">
                    {t('faq.item3.answer')}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item className="border-b" value="item-4">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                    {t('faq.item4.question')}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm">
                  <div className="pb-4 pt-0 text-lg">
                    {t('faq.item4.answer')}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item className="border-b" value="item-5">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                    {t('faq.item5.question')}
                    <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm">
                  <div className="pb-4 pt-0 text-lg">
                    {t('faq.item5.answer')}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </section>
        <section className="w-full bg-[#F8F4E3] py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('commonIssues.title')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{t('commonIssues.item1.question')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t('commonIssues.item1.answer')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('commonIssues.item2.question')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t('commonIssues.item2.answer')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('commonIssues.item3.question')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t('commonIssues.item3.answer')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('commonIssues.item4.question')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t('commonIssues.item4.answer')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('commonIssues.item5.question')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t('commonIssues.item5.answer')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('commonIssues.item6.question')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t('commonIssues.item6.answer')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-[#A4C3D2] py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              {t('testimonials.title')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "En tant que praticienne dans le domaine du bien-être, j'adore la façon dont ZenAgenda m'aide à rester organisée et concentrée sur le parcours de bien-être de mes clients.",
                  author: 'Johanna G.',
                  title: 'Praticienne en drainage lymphatique',
                },
                {
                  quote:
                    'ZenAgenda a transformé la façon dont je gère ma pratique au quotidien. Il est intuitif et conçu pour les professionnels du bien-être.',
                  author: 'Mathieu C.',
                  title: 'Diététicien',
                },
                {
                  quote:
                    'Le système de notes intégré a considérablement rationalisé mon flux de travail.',
                  author: 'Elisabeth R.',
                  title: 'Coach en développement personnel',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg"
                >
                  <Star className="mb-4 h-12 w-12 text-[#D68C45]" />
                  <p className="mb-4 text-[#2C3E50]">{`"${testimonial.quote}"`}</p>
                  <p className="font-bold text-[#2C3E50]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[#2C3E50]">{testimonial.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="pricing">
          <div className="px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#7C9885] sm:text-4xl md:text-5xl">
              {t('pricing.title')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
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
                // {
                //   name: 'Growing Practice',
                //   price: '$79/month',
                //   features: [
                //     'Unlimited appointments',
                //     'Advanced client management',
                //     'Customizable intake forms',
                //     'Telehealth integration',
                //     'Priority support',
                //   ],
                // },
                // {
                //   name: 'Multi-Provider Clinic',
                //   price: 'Custom',
                //   features: [
                //     'All Growing Practice features',
                //     'Multiple provider accounts',
                //     'Advanced analytics and reporting',
                //     'Custom integrations',
                //     'Dedicated account manager',
                //   ],
                // },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="col-start-2 flex flex-col rounded-lg bg-white p-6 shadow-lg"
                >
                  <h3 className="mb-4 text-2xl font-bold text-[#2C3E50]">
                    {plan.name}
                  </h3>
                  <p className="mb-6 text-4xl font-bold text-[#7C9885]">
                    {plan.price}
                  </p>
                  <ul className="mb-6 flex-grow space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-[#D68C45]" />
                        <span className="text-[#2C3E50]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto w-full bg-[#7C9885] text-white hover:bg-[#6A8A73]">
                    {t('pricing.button')}
                    <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-[#7C9885] px-4 py-6 sm:flex-row md:px-6">
        <p className="text-sm text-white">
          © 2024 ZenAgenda. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            className="text-sm text-white underline-offset-4 hover:underline"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-sm text-white underline-offset-4 hover:underline"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm text-white underline-offset-4 hover:underline"
            href="#"
          >
            HIPAA Compliance
          </Link>
        </nav>
      </footer>
    </div>
  );
}
