import { sql } from '@vercel/postgres';
import { Cure, CureContent, CureWithCareData } from '@/app/lib/definitions';

export async function fetchCureCatalog() {
  try {
    const data = await sql<CureWithCareData>`
      SELECT
        cure_catalog.id,
        cure_catalog.name,
        cure_catalog.amount,
        cure_catalog.status,
        cure_catalog.care_id_1,
        cure_catalog.session_number_1,
        cure_catalog.care_id_2,
        cure_catalog.session_number_2
      FROM cure_catalog
      GROUP BY cure_catalog.id
      ORDER BY cure_catalog.id ASC
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
    const cureData = await sql<Cure>`
      SELECT
        cure_catalog.id,
        cure_catalog.name,
        cure_catalog.amount,
        cure_catalog.status,
        cure_catalog.care_id_1,
        cure_catalog.session_number_1,
        cure_catalog.care_id_2,
        cure_catalog.session_number_2
      FROM cure_catalog
      WHERE cure_catalog.id = ${id}
    `;

    const cure = cureData.rows[0];
    return cure;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure by ID.');
  }
}
