import { sql } from '@vercel/postgres';
import {
  Care,
  CareCategory,
  CareShortDescription,
} from '@/app/lib/definitions';
import { findAllCaresController } from '@/src/interface-adapters/cares/find-all-cares.controller';
import { findCareByIdController } from '@/src/interface-adapters/cares/find-care.controller';

export async function fetchCares() {
  try {
    const cares = await findAllCaresController();
    return cares;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cares.');
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
    const care = await findCareByIdController(id);
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
    const data = await sql<CareShortDescription>`
      SELECT
        DISTINCT products.id AS product_id,
        products.name AS product_name,
        care_catalog.duration
      FROM care_catalog
      LEFT JOIN care_categories ON care_catalog.category_id = care_categories.id
      LEFT JOIN products on care_catalog.product_id = products.id
      WHERE care_categories.name = ${name};
    `;
    const careCategories = data.rows;
    return careCategories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all cares for this category.');
  }
}
