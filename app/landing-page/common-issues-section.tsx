import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Item = {
  answer: string;
  question: string;
};

type CommonIssuesSectionProps = {
  items: Item[];
  title: string;
};

export function CommonIssuesSection({
  items,
  title,
}: CommonIssuesSectionProps) {
  return (
    <section
      className="w-full bg-[#F8F4E3] py-12 md:py-24 lg:py-32"
      id="common-issues"
    >
      <div className="px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
