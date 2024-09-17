import { SelectedCare } from '@/src/entities/models/care';
import { SelectedCareCategory } from '@/src/entities/models/care-category';
import {
  findAllCaresByCategoryNameController,
  findAllCaresByCure,
  FindAllCaresByCurePayload,
  findAllCaresByCustomerIdController,
  findAllCaresController,
} from '@/src/interface-adapters/cares/find-all-cares.controller';
import { findAllCaresCategoriesController } from '@/src/interface-adapters/cares-categories/find-all-cares-categories.controller';
import { findCareByIdController } from '@/src/interface-adapters/cares/find-care.controller';
import { fetchCureById } from './cure';

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
      await findAllCaresByCategoryNameController(CATEGORY_NAME);
    return careCategories;
  } catch (error) {
    console.error(
      'fetchCareFromRenataCategory >> findAllCaresByCategoryNameController',
      error,
    );
    throw new Error('Failed to fetch all care categories.');
  }
}

export async function fetchAvailableCaresByCustomer(
  customerId: string,
): Promise<SelectedCare[]> {
  try {
    const availableCares = await findAllCaresByCustomerIdController(customerId);
    return availableCares;
  } catch (error) {
    console.error(
      'fetchAvailableCaresByCustomer >> findAvailableCaresByCustomerIdController',
      error,
    );
    throw new Error('Failed to fetch pending care for this customer.');
  }
}

export async function fetchAvailableCaresByCure(
  payload: FindAllCaresByCurePayload,
): Promise<SelectedCare[]> {
  try {
    const availableCares = await findAllCaresByCure(payload);
    return availableCares;
  } catch (error) {
    console.error('fetchAvailableCaresByCure', error);
    throw new Error('Failed to fetch available cares in cure.');
  }
}
