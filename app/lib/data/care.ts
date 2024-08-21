import { sql } from '@vercel/postgres';
import { Care, CareCategory } from '@/app/lib/definitions';

export async function fetchCareList() {
  try {
    const data = await sql<Care>`
      SELECT
        care_catalog.product_id,
        care_catalog.category_id,
        care_catalog.duration,
        care_categories.name as category_name,
        products.name as product_name,
        products.amount as product_amount
      FROM care_catalog
      LEFT JOIN care_categories ON care_catalog.category_id = care_categories.id
      LEFT JOIN products ON care_catalog.product_id = products.id;
    `;

    const careList = data.rows;
    return careList;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch the care list.');
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

export async function fetchCareById(productId: string) {
  try {
    const data = await sql<Care>`
      SELECT
        care_catalog.product_id,
        care_catalog.category_id,
        care_catalog.duration,
        care_categories.name as category_name,
        products.name as product_name,
        products.amount as product_amount
      FROM care_catalog
      LEFT JOIN care_categories ON care_catalog.category_id = care_categories.id
      LEFT JOIN products ON care_catalog.product_id = products.id
      WHERE care_catalog.product_id = ${productId}
    `;

    const care = data.rows[0];
    return care;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch this care.');
  }
}

export async function fetchCareFromRenataCategory() {
  const CATEGORY_NAME = 'Renata França';
  return fetchCareByCategoryName(CATEGORY_NAME);
}

async function fetchCareByCategoryName(name: string) {
  try {
    const data = await sql<Care>`
      SELECT cares.id, cares.name
        FROM care_catalog as cares
        LEFT JOIN care_categories ON cares.care_category_id = care_categories.id
        WHERE care_categories.name = ${name}
    `;
    const categories = data.rows;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all cares for this category.');
  }
}
