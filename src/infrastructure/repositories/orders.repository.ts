import { sql } from '@vercel/postgres';
import {
  CreateOrderPayload,
  IOrdersRepository,
  UpdateOrderPayload,
} from '@/src/application/repositories/orders.repository.interface';
import {
  CreatedOrder,
  SelectedOrder,
  UpdatedOrder,
} from '@/src/entities/models/order';

export class OrdersRepository implements IOrdersRepository {
  public async createOrder(payload: CreateOrderPayload): Promise<CreatedOrder> {
    console.log('Creating order');
    const queryResult = await sql<CreatedOrder>`
      INSERT INTO orders (customer_id, date, order_status, payment_status, product_id, product_type)
      VALUES (${payload.customerId}, ${payload.date}, ${payload.orderStatus}, ${payload.paymentStatus}, ${payload.productId}, ${payload.productType})
      RETURNING
    `;
    return queryResult.rows[0];
  }

  public async deleteOrder(id: string): Promise<void> {
    await sql`DELETE FROM orders WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedOrder[]> {
    const queryResult =
      await sql<SelectedOrder>`SELECT orders.*, customers.name AS customer_name FROM orders INNER JOIN customers ON orders.customer_id = customers.id`;
    return queryResult.rows;
  }

  public async findOrderById(id: string): Promise<SelectedOrder> {
    const queryResult =
      await sql<SelectedOrder>`SELECT * FROM orders WHERE id = ${id}`;
    return queryResult.rows[0];
  }

  public async updateOrder(payload: UpdateOrderPayload): Promise<UpdatedOrder> {
    console.log('Updating order');
    const queryResult = await sql<UpdatedOrder>`
      UPDATE orders
      SET
        customer_id = ${payload.customerId},
        date = ${payload.date},
        order_status = ${payload.orderStatus},
        payment_status = ${payload.paymentStatus},
        product_id = ${payload.productId},
        product_type = ${payload.productType}
      WHERE id = ${payload.id}
    `;
    return queryResult.rows[0];
  }
}
