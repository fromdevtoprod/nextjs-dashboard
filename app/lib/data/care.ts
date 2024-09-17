import { ProductType } from '@/src/application/repositories/orders.repository.interface';
import { SelectedCare } from '@/src/entities/models/care';
import { SelectedCareCategory } from '@/src/entities/models/care-category';
import { findAllCaresController } from '@/src/interface-adapters/cares/find-all-cares.controller';
import { findAllCaresCategoriesController } from '@/src/interface-adapters/cares-categories/find-all-cares-categories.controller';
import { findCareByIdController } from '@/src/interface-adapters/cares/find-care.controller';
import { findAvailableCaresController } from '@/src/interface-adapters/cares/find-available-cares.controller';
import { findCaresByCategoryNameController } from '@/src/interface-adapters/cares/find-cares-by-category-name.controller';

export async function fetchAllCares(): Promise<SelectedCare[]> {
  try {
    const cares = await findAllCaresController();
    return cares;
  } catch (error) {
    console.error('fetchAllCares >> findAllCaresController', error);
    throw new Error('Failed to fetch cares.');
  }
}

export async function fetchAllCareCategories(): Promise<
  SelectedCareCategory[]
> {
  try {
    const careCategories = await findAllCaresCategoriesController();
    return careCategories;
  } catch (error) {
    console.error(
      'fetchAllCareCategories >> findAllCaresCategoriesController',
      error,
    );
    throw new Error('Failed to fetch all care categories.');
  }
}

export async function fetchCareById(id: string): Promise<SelectedCare> {
  try {
    const care = await findCareByIdController(id);
    return care;
  } catch (error) {
    console.error('fetchCareById >> findCareByIdController', error);
    throw new Error('Failed to fetch this care.');
  }
}

export async function fetchCareFromRenataCategory(): Promise<SelectedCare[]> {
  try {
    const CATEGORY_NAME = 'Renata França';
    const careCategories =
      await findCaresByCategoryNameController(CATEGORY_NAME);
    return careCategories;
  } catch (error) {
    console.error(
      'fetchCareFromRenataCategory >> findCaresByCategoryNameController',
      error,
    );
    throw new Error('Failed to fetch all care categories.');
  }
}

export async function fetchAvailableCares(
  customerId: string,
  productType: ProductType,
) {
  try {
    const caresWithOrderId = await findAvailableCaresController({
      customerId,
      productType,
    });
    return caresWithOrderId;
  } catch (error) {
    console.error('fetchAvailableCares >> findAvailableCaresController', error);
    throw new Error('Failed to fetch available cares for this customer.');
  }
}
