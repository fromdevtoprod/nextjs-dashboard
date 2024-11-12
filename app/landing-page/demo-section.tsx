type DemoSectionProps = {
  goal: string;
  hello: string;
  introduction: string;
  thanks: string;
  title: string;
};

export function DemoSection({
  goal,
  hello,
  introduction,
  thanks,
  title,
}: DemoSectionProps) {
  return (
    <section className="w-full bg-white py-12 md:py-24 lg:py-32" id="demo">
      <div className="px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              {hello}
            </p>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              {introduction}
            </p>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              {goal}
            </p>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              {thanks}
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
  );
}
