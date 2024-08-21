import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchOrdersByCustomer } from '@/app/lib/data/orders';
import { Order } from '@/app/lib/definitions';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === 'GET' && req.query.customer_id) {
    try {
      const orders = await fetchOrdersByCustomer(
        req.query.customer_id as string,
      );
      const options = orders.map((order) => ({
        id: order.id,
        description: formatOrderDescription(order),
      }));
      // @ts-ignore
      return res.status(200).json(options);
    } catch (error) {
      console.error('API endpoint /order :', error);
      return res.status(500).json({ message: error as string });
    }
  }
}

function formatOrderDescription(order: Order) {
  return `${order.product_name} (${order.product_type}) - ${formatDate(order.date)}`;
}

/**
 * Format the date to this format: YYYY-MM-DD
 * @param {string} date date with SQL format
 * @returns
 */
function formatDate(date: string) {
  return new Date(date).toISOString().split('T')[0];
}
