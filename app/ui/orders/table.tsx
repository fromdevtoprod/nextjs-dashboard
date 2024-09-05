import { fetchOrders } from '@/app/lib/data/orders';
import { capitalize, formatDateToLocal } from '@/app/lib/utils';
import DeleteOrderButton from './delete-button';
import { EditButton } from '../buttons/edit-button';

export default async function OrdersTable() {
  const orders = await fetchOrders();
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{order.customer_id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Product name</p>
                      <p className="font-medium">{order.product_name}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Product type</p>
                      <p className="font-medium">{order.product_type}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>Payment status : {order.payment_status}</p>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>Order status : {order.order_status}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditButton href={`/dashboard/orders/${order.id}/edit`} />
                    <DeleteOrderButton id={order.id} />
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Product name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Product type
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Payment status
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Order status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {orders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <p>{order.customer_name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {order.product_name}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {capitalize(order.product_type)}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {formatDateToLocal(order.date, 'fr-FR')}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {capitalize(order.payment_status)}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {capitalize(order.order_status)}
                    </td>
                    <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <EditButton
                          href={`/dashboard/orders/${order.id}/edit`}
                        />
                        <DeleteOrderButton id={order.id} />
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
