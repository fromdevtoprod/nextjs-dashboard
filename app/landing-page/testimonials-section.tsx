import { Star } from 'lucide-react';

type Testimonial = {
  author: string;
  job: string;
  quote: string;
};

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  title: string;
};

export function TestimonialsSection({
  testimonials,
  title,
}: TestimonialsSectionProps) {
  return (
    <section
      className="w-full bg-[#A4C3D2] py-12 md:py-24 lg:py-32"
      id="testimonials"
    >
      <div className="px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg"
            >
              <Star className="mb-4 h-12 w-12 text-[#D68C45]" />
              <p className="mb-4 text-[#2C3E50]">{`"${testimonial.quote}"`}</p>
              <p className="font-bold text-[#2C3E50]">{testimonial.author}</p>
              <p className="text-sm text-[#2C3E50]">{testimonial.job}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
