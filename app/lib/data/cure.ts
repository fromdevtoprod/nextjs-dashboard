import { sql } from '@vercel/postgres';
import { Cure } from '@/app/lib/definitions';

export async function fetchCureList() {
  try {
    const data = await sql<Cure>`
      SELECT
        cure.id,
        cure.name,
        cure.amount,
        cure.session_number,
        cure.status
      FROM cure
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure.');
  }
}

export async function fetchCureById(id: string) {
  try {
    const data = await sql<Cure>`
      SELECT
        cure.id,
        cure.name,
        cure.amount,
        cure.session_number,
        cure.status
      FROM cure
      WHERE cure.id = ${id}
    `;

    const care = data.rows[0];
    return care;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure by ID.');
  }
}
