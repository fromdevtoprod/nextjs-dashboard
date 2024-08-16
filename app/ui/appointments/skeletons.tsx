export function AppointmentsCalendarSkeleton() {
  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm shadow-lg">
        <div className="rounded-t bg-white p-5 dark:bg-gray-800 md:p-8">
          <div className="flex items-center justify-between px-4">
            <span
              tabIndex={0}
              className="text-base  font-bold text-gray-800 focus:outline-none dark:text-gray-100"
            ></span>
            <div className="flex items-center">
              <button
                aria-label="calendar backward"
                className="text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                className="ml-3 text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler  icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between overflow-x-auto pt-12">
            <table className="w-full">
              <thead>
                <tr>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        Mo
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        Tu
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        We
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        Th
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        Fr
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        Sa
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="flex w-full justify-center">
                      <p className="text-center text-base font-medium text-gray-800 dark:text-gray-100">
                        Su
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((value, index) => (
                  <tr key={index}>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                    <td className="pt-6">
                      <div className="flex w-full cursor-pointer justify-center rounded bg-gray-100 px-5 py-5"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
