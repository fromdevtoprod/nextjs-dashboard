import { sql } from '@vercel/postgres';
import { Cure } from '@/app/lib/definitions';

export async function fetchCureCatalog() {
  try {
    const data = await sql<Cure>`
      SELECT
        products.id as product_id,
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
