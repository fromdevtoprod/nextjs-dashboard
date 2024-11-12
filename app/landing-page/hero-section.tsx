import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeroSectionProps = {
  buttonLabel: string;
  subtitle: string;
  title: string;
};

export function HeroSection({
  buttonLabel,
  subtitle,
  title,
}: HeroSectionProps) {
  return (
    <section
      className="w-full bg-gradient-to-b from-white to-[#F8F4E3] py-8 md:py-16 lg:py-24 xl:py-32"
      id="hero"
    >
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-[#7C9885] sm:text-4xl md:text-5xl lg:text-6xl/none">
              {title}
            </h1>
            <p className="mx-auto max-w-[1000px] text-[#2C3E50] md:text-xl">
              {subtitle}
            </p>
          </div>
          <div className="space-x-4">
            <Button
              asChild
              className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
              size="lg"
            >
              <Link href="/dashboard">
                {buttonLabel}
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
  );
}
