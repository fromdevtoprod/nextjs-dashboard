import { sql } from '@vercel/postgres';
import { ICProductsRepository } from '@/src/application/repositories/products.repository.interface';
import { Product } from '@/src/entities/models/product';

export class ProductsRepository implements ICProductsRepository {
  public async createProduct({
    amount,
    name,
  }: {
    amount: number;
    name: string;
  }): Promise<Product> {
    const product =
      await sql`INSERT INTO products (name, type, amount) VALUES (${name}, 'care', ${amount}) RETURNING *`;
    return {
      amount,
      id: product.rows[0].id,
      name,
    };
  }

  public async deleteProduct(productId: string): Promise<void> {
    await sql`DELETE FROM products WHERE id = ${productId}`;
  }

  public async updateProduct({
    amount,
    name,
    id,
  }: {
    amount: number;
    name: string;
    id: string;
  }): Promise<Product> {
    const product =
      await sql`UPDATE products SET name = ${name}, amount = ${amount} WHERE id = ${id} RETURNING *`;
    return {
      amount: product.rows[0].amount,
      id: product.rows[0].id,
      name: product.rows[0].name,
    };
  }
}
