import { ProductType } from '@/app/lib/definitions';

export function hasCureProductType(productType: ProductType) {
  return productType === 'cure';
}
