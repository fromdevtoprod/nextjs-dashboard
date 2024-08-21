import { fetchCureCatalog } from '@/app/lib/data/cure';
import { capitalize } from '@/app/lib/utils';
import { CureWithCareData } from '@/app/lib/definitions';
import DeleteCureButton from './delete-button';
import { UpdateCure } from './buttons';

export default async function CureTable() {
  const cureCatalog = calculateTotalSessions(
    calculateTotalCares(await fetchCureCatalog()),
  );
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {cureCatalog?.map((cure) => (
                <div
                  key={cure.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{cure.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Amount</p>
                      <p className="font-medium">{cure.amount}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Total cares</p>
                      <p className="font-medium">{cure.total_cares}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Total sessions</p>
                      <p className="font-medium">{cure.total_sessions}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>Status : {cure.status}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCure id={cure.id} />
                    <DeleteCureButton id={cure.id} />
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total cares
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total sessions
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {cureCatalog.map((cure) => (
                  <tr key={cure.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{cure.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {cure.amount}€
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {cure.total_cares}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {cure.total_sessions}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {capitalize(cure.status)}
                    </td>
                    <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateCure id={cure.id} />
                        <DeleteCureButton id={cure.id} />
                      </div>
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

function calculateTotalCares(careCatalog: CureWithCareData[]) {
  return careCatalog.map((cure) => {
    if (cure.care_id_2) {
      return { ...cure, total_cares: 2 };
    }
    return { ...cure, total_cares: 1 };
  });
}

function calculateTotalSessions(careCatalog: CureWithCareData[]) {
  return careCatalog.map((cure) => {
    if (cure.care_id_2) {
      return {
        ...cure,
        total_sessions: cure.session_number_2 + cure.session_number_1,
      };
    }
    return { ...cure, total_sessions: cure.session_number_1 };
  });
}
