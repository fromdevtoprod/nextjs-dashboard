import { ProductType } from '@/app/lib/definitions';

export function hasCareProductType(productType: ProductType) {
  return productType === 'care';
}
