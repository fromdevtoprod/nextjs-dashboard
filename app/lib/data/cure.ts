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
        COUNT(cure_content.care_id) AS total_cares,
        SUM(cure_content.session_number) AS total_sessions
      FROM cure_catalog
      JOIN cure_content ON cure_catalog.id = cure_content.cure_id
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
        cure_content.care_id,
        cure_content.session_number
      FROM cure_catalog
      LEFT JOIN cure_content ON cure_catalog.id = cure_content.cure_id
      WHERE cure_catalog.id = ${id}
    `;

    const cureContentData = await sql<CureContent>`
      SELECT
        care_id,
        session_number
      FROM cure_content
      WHERE cure_id = ${id}
    `;

    const cure = cureData.rows[0];
    cure.content = cureContentData.rows;
    return cure;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure by ID.');
  }
}
