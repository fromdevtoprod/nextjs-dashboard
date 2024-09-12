import { sql } from '@vercel/postgres';
import { CareShortDescription } from '@/app/lib/definitions';
import { findAllCaresController } from '@/src/interface-adapters/cares/find-all-cares.controller';
import { findCareByIdController } from '@/src/interface-adapters/cares/find-care.controller';
import { SelectedCare } from '@/src/entities/models/care';
import { findAllCaresCategoriesController } from '@/src/interface-adapters/cares-categories/find-all-cares-categories.controller';
import { SelectedCareCategory } from '@/src/entities/models/care-category';

export async function fetchAllCares(): Promise<SelectedCare[]> {
  try {
    const cares = await findAllCaresController();
    return cares;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cares.');
  }
}

export async function fetchAllCareCategories(): Promise<
  SelectedCareCategory[]
> {
  try {
    const careCategories = await findAllCaresCategoriesController();
    return careCategories;
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
