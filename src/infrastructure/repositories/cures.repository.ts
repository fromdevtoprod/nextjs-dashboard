import { Cure } from '@/src/entities/models/cure';
import { QueryResult, sql } from '@vercel/postgres';

export class CureRepository {
  public async getCureById(productId: string): Promise<QueryResult<Cure>> {
    return sql<Cure>`
      SELECT
        products.id as product_id,
        products.name as product_name,
        products.amount as product_amount,
        cure_content.care_1_id,
        cure_content.care_1_session_number,
        cure_content.care_2_id,
        cure_content.care_2_session_number
      FROM products
      LEFT JOIN cure_content ON products.id = cure_content.product_id
      WHERE products.id=${productId}
    `;
  }
}
