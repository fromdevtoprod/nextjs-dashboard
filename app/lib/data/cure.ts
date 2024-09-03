import { sql } from '@vercel/postgres';
import { Cure } from '@/app/lib/definitions';

export async function fetchCureByCustomer(customerId: string) {
  const pendingCure = await fetchPendingCureByCustomer(customerId);
  if (pendingCure.length > 1) {
    throw new Error('Customer has more than one pending cure.');
  }
  if (pendingCure.length === 0) {
    return fetchCureCatalog();
  }
  return Promise.all([fetchCureById(pendingCure[0].product_id)]);
}

export async function fetchCureCatalog() {
  try {
    const data = await sql<Cure>`
      SELECT
        DISTINCT products.id AS product_id,
        products.name AS product_name,
        products.amount AS product_amount,
        cure_content.care_1_session_number,
        COALESCE(cure_content.care_2_session_number, 0) AS care_2_session_number
      FROM products
      LEFT JOIN cure_content ON cure_content.product_id = products.id
      WHERE products.type = 'cure'
    `;
    const cureCatalog = data.rows;
    return cureCatalog;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch the cure catalog.');
  }
}

export async function fetchCureById(id: string) {
  try {
    const cureData = await sql<Cure>`
      SELECT
        products.id as product_id,
        products.name as product_name,
        products.amount as product_amount,
        cure_content.care_1_id,
        cure_content.care_1_session_number,
        cure_content.care_2_id,
        cure_content.care_2_session_number
      FROM products
      LEFT JOIN cure_content ON products.id = cure_content.product_id
      WHERE products.id=${id}
    `;

    const cure = cureData.rows[0];
    return cure;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure by ID.');
  }
}

export async function fetchPendingCureByCustomer(customerId: string) {
  try {
    const data = await sql<Cure>`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.amount AS product_amount,
        cure_content.care_1_session_number,
        COALESCE(cure_content.care_2_session_number, 0) AS care_2_session_number
      FROM products
      LEFT JOIN cure_content ON cure_content.product_id = products.id
      LEFT JOIN orders ON orders.product_id = products.id
      WHERE orders.customer_id=${customerId}
      AND orders.order_status='pending'
    `;
    const cureCatalog = data.rows;
    return cureCatalog;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch the cure catalog.');
  }
}
