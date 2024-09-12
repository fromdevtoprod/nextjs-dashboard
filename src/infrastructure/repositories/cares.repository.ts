import { sql } from '@vercel/postgres';
import { CreatedCare } from '@/src/entities/models/care';
import { ICaresRepository } from '@/src/application/repositories/cares.repository.interface';

export class CaresRepository implements ICaresRepository {
  public async createCare({
    categoryId,
    duration,
    productId,
  }: {
    categoryId: string;
    duration: number;
    productId: string;
  }): Promise<CreatedCare> {
    const catalog =
      await sql`INSERT INTO care_catalog (product_id, category_id, duration) VALUES (${productId}, ${categoryId}, ${duration}) RETURNING *`;
    return {
      category_id: catalog.rows[0].category_id,
      duration: catalog.rows[0].duration,
    };
  }

  public async deleteCare(productId: string): Promise<void> {
    await sql`DELETE FROM care_catalog WHERE product_id = ${productId}`;
  }

  public async updateCare({
    categoryId,
    duration,
    productId,
  }: {
    categoryId: string;
    duration: number;
    productId: string;
  }): Promise<CreatedCare> {
    const catalog =
      await sql`UPDATE care_catalog SET category_id = ${categoryId}, duration = ${duration} WHERE product_id = ${productId} RETURNING *`;
    return {
      category_id: catalog.rows[0].category_id,
      duration: catalog.rows[0].duration,
    };
  }
}
