import { ProductType } from '@/app/lib/definitions';

export function isCureProductType(productType: ProductType) {
  return productType === 'cure';
}
