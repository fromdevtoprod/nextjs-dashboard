import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type Item = {
  answer: string;
  question: string;
};

type FaqSectionProps = {
  items: Item[];
  title: string;
};

export function FaqSection({ items, title }: FaqSectionProps) {
  return (
    <section
      className="w-full bg-[#7C9885] py-12 text-white md:py-24 lg:py-32"
      id="faq"
    >
      <div className="px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <Accordion.Root
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl"
          defaultValue="item-1"
        >
          {items.map((item, index) => (
            <Accordion.Item
              key={index + 1}
              className="border-b"
              value={`item-${index + 1}`}
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                  {item.question}
                  <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm">
                <div className="pb-4 pt-0 text-lg">{item.answer}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
