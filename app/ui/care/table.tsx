import { fetchCare } from '@/app/lib/data/care';
import DeleteCareButton from './delete-button';
import { UpdateCare } from './buttons';

function capitalizeStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function CareTable() {
  const filteredCare = await fetchCare();
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {filteredCare?.map((care) => (
                <div
                  key={care.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{care.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{care.category}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Amount</p>
                      <p className="font-medium">{care.amount}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Duration</p>
                      <p className="font-medium">{care.duration}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>Status : {care.status}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCare id={care.id} />
                    <DeleteCareButton id={care.id} />
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
                    Category
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Duration
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
                {filteredCare.map((care) => (
                  <tr key={care.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{care.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {care.category}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {care.amount}€
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {care.duration}min
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {capitalizeStatus(care.status)}
                    </td>
                    <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateCare id={care.id} />
                        <DeleteCareButton id={care.id} />
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
