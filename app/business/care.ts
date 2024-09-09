import { ProductType } from '@/app/lib/definitions';

export function isCareProductType(productType: ProductType) {
  return productType === 'care';
}
