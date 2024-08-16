import { sql } from '@vercel/postgres';
import { Care, CareCategory } from '@/app/lib/definitions';

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
      FROM care_catalog as care
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

export async function fetchCareCategories() {
  try {
    const data = await sql<CareCategory>`
      SELECT * FROM care_categories
    `;

    const categories = data.rows;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all care categories.');
  }
}

export async function fetchCareById(id: string) {
  try {
    const data = await sql<Care>`
      SELECT
        care.id,
        care.care_category_id as category,
        care.name,
        care.amount,
        care.duration,
        care.status
      FROM care_catalog as care
      LEFT JOIN care_categories ON care.care_category_id = care_categories.id
      WHERE care.id = ${id}
    `;

    const care = data.rows[0];
    return care;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch care by ID.');
  }
}
