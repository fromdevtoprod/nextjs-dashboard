import ActiveMonth from './active-month';
import PreviousMonthArrow from './previous-month';
import Preview from './preview';
import NextMonthArrow from './next-month';
import TableBody from './tbody';
import TableHead from './thead';

export default function Calendar({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm shadow-lg">
        <div className="rounded-t bg-white p-5 dark:bg-gray-800 md:p-8">
          <div className="flex items-center justify-between px-4">
            <ActiveMonth month={month} year={year} />
            <div className="flex items-center">
              <PreviousMonthArrow month={month} />
              <NextMonthArrow month={month} />
            </div>
          </div>
          <div className="flex items-center justify-between overflow-x-auto pt-12">
            <table className="w-full">
              <TableHead />
              <TableBody month={month} year={year} />
            </table>
          </div>
        </div>

        <div className="rounded-b bg-gray-50 px-5 py-5 dark:bg-gray-700 md:px-16 md:py-8">
          <div className="px-4">
            <Preview
              hour="9:15"
              title="Drainage Lymphatique"
              description="Irène Grosjean"
              isFirst={true}
            />
            <Preview
              hour="14:30"
              title="Tui Na"
              description="Marina Gratecos"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
