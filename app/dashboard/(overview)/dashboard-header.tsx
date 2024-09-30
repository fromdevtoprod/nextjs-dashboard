export function DashboardHeader() {
  return (
    <div className="mb-8 md:flex-row md:items-center">
      <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
        Welcome back, Dr. Smith 👋
      </h1>
      <p className="text-[#2C3E50]">
        {`Here's what's happening with your practice today.`}
      </p>
    </div>
  );
}
