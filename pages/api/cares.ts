import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/app/lib/definitions';
import { fetchCareByProduct } from '@/app/lib/data/care';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === 'GET' && req.query.product_id && req.query.product_type) {
    try {
      const productId = req.query.product_id as string;
      const productType = req.query.product_type as string;
      const cares = await fetchCareByProduct({ productId, productType });
      const options = cares.map((care) => ({
        product_id: care.product_id,
        product_name: care.product_name,
        duration: care.duration,
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
