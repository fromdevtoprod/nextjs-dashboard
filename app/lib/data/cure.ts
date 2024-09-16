import { sql } from '@vercel/postgres';
import { findAllCuresController } from '@/src/interface-adapters/cures/find-all-cures.controller';
import { findCureByIdController } from '@/src/interface-adapters/cures/find-cure.controller';

export async function fetchAllCures() {
  try {
    const cures = await findAllCuresController();
    return cures;
  } catch (error) {
    console.error('fetchAllCures >> findAllCuresController', error);
    throw new Error('Failed to fetch cures.');
  }
}

export async function fetchCureById(id: string) {
  try {
    const cure = await findCureByIdController(id);
    return cure;
  } catch (error) {
    console.error('fetchCureById >> findCureByIdController', error);
    throw new Error('Failed to fetch this cure.');
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
  } catch (error) {
    console.error('getCureTotalSessionNumber', error);
    throw new Error('Failed to fetch cure session number.');
  }
}
