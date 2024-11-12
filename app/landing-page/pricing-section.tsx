import { Rocket, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Plan = {
  name: string;
  price: string;
  features: string[];
};

type PricingSectionProps = {
  buttonLabel: string;
  plans: Plan[];
  title: string;
};

export function PricingSection({
  buttonLabel,
  plans,
  title,
}: PricingSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="pricing">
      <div className="px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#7C9885] sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
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
                {buttonLabel}
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
