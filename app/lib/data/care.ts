import { sql } from '@vercel/postgres';
import { Care, CareCategory } from '@/app/lib/definitions';

export async function fetchCareList() {
  try {
    const data = await sql<Care>`
      SELECT
        care_catalog.product_id,
        care_catalog.category_id,
        care_catalog.duration,
        care_categories.name AS category_name,
        products.name AS product_name,
        products.amount AS product_amount
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
        care_categories.name AS category_name,
        products.name AS product_name,
        products.amount AS product_amount
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
      SELECT products.id AS product_id,
        products.name AS product_name
      FROM care_catalog
      LEFT JOIN care_categories ON care_catalog.category_id = care_categories.id
      LEFT JOIN products on care_catalog.product_id = products.id
      WHERE care_categories.name = ${name}
      GROUP BY products.id;
    `;
    const careCategories = data.rows;
    return careCategories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all cares for this category.');
  }
}
