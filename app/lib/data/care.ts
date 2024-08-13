import { sql } from '@vercel/postgres';
import { Care } from '@/app/lib/definitions';

export async function fetchCare() {
  try {
    const data = await sql<Care>`
      SELECT
        care.id,
        care_categories.name AS category,
        care.name,
        care.amount,
        care.duration,
        care.status
      FROM care
      LEFT JOIN care_categories ON care.care_category_id = care_categories.id
      ORDER BY care_category_id ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
