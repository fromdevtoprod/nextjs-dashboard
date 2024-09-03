import Breadcrumbs from '@/app/ui/breadcrumbs';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Appointments', href: '/dashboard/appointments' },
          {
            label: 'Book Appointment',
            href: '/dashboard/appointments/book',
            active: true,
          },
        ]}
      />
      {children}
    </main>
  );
}
