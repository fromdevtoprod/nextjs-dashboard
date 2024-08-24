import { fetchCureCatalog } from '@/app/lib/data/cure';
import DeleteCureButton from './delete-button';
import { UpdateCure } from './buttons';

export default async function CureTable() {
  const cureCatalog = await fetchCureCatalog();
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {cureCatalog?.map((cure) => (
                <div
                  key={cure.product_id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{cure.product_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Amount</p>
                      <p className="font-medium">{cure.product_amount}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCure id={cure.product_id} />
                    <DeleteCureButton id={cure.product_id} />
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
                    Total sessions
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {cureCatalog.map((cure) => (
                  <tr key={cure.product_id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{cure.product_name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {cure.product_amount}€
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {cure.care_1_session_number + cure.care_2_session_number}
                    </td>
                    <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateCure id={cure.product_id} />
                        <DeleteCureButton id={cure.product_id} />
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
