import { sql } from '@vercel/postgres';
import { Care } from '@/app/lib/definitions';

export async function fetchCare() {
  try {
    const data = await sql<Care>`
      SELECT
        id,
        care_category_id,
        name,
        amount,
        duration,
        status
      FROM care
      ORDER BY care_category_id ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
