import { sql } from '@vercel/postgres';
import { Cure } from '@/app/lib/definitions';
import { findAllCuresController } from '@/src/interface-adapters/cures/find-all-cures.controller';

export async function fetchAllCures() {
  try {
    const cures = await findAllCuresController();
    return cures;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cures.');
  }
}

export async function fetchCureById(productId: string) {
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
      WHERE products.id=${productId}
    `;

    const cure = cureData.rows[0];
    return cure;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure by ID.');
  }
}

export async function getCureTotalSessionNumber(productId: string) {
  try {
    const sessionNumber = await sql`
        SELECT SUM(care_1_session_number + care_2_session_number)
        FROM cure_content
        WHERE product_id = ${productId}
    `;
    return sessionNumber.rows[0].sum as number;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cure session number.');
  }
}
