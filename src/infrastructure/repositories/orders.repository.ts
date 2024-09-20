import { sql } from '@vercel/postgres';
import {
  CreateOrderPayload,
  FindOrdersPayload,
  IOrdersRepository,
  OrderStatus,
  UpdateOrderPayload,
} from '@/src/application/repositories/orders.repository.interface';
import {
  CreatedOrder,
  OrderEntity,
  SelectedOrder,
  UpdatedOrder,
} from '@/src/entities/models/order';

export class OrdersRepository implements IOrdersRepository {
  public async createOrder(payload: CreateOrderPayload): Promise<OrderEntity> {
    console.log('Creating order');
    const queryResult = await sql<CreatedOrder>`
      INSERT INTO orders(customer_id, date, order_status, payment_status, product_id, product_type)
      VALUES (${payload.customerId}, ${payload.date}, ${payload.orderStatus}, ${payload.paymentStatus}, ${payload.productId}, ${payload.productType})
      RETURNING *
    `;
    return new OrderEntity(queryResult.rows[0]);
  }

  public async deleteOrder(id: string): Promise<void> {
    await sql`DELETE FROM orders WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedOrder[]> {
    const queryResult = await sql<SelectedOrder>`
      SELECT
        orders.*,
        customers.name AS customer_name
      FROM orders
      INNER JOIN customers ON orders.customer_id = customers.id
      ORDER BY orders.date DESC
    `;
    return queryResult.rows;
  }

  public async findOrderById(id: string): Promise<OrderEntity> {
    const queryResult =
      await sql<CreatedOrder>`SELECT * FROM orders WHERE id = ${id}`;
    return new OrderEntity(queryResult.rows[0]);
  }

  public async findOrderWithParameters({
    customerId,
    status,
    type,
  }: FindOrdersPayload): Promise<SelectedOrder> {
    const queryResult = await sql<SelectedOrder>`
      SELECT * FROM orders
      WHERE customer_id = ${customerId} AND order_status = ${status} AND product_type = ${type}
    `;
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

  public async updateOrderStatus(
    id: string,
    status: OrderStatus,
  ): Promise<UpdatedOrder> {
    const queryResult =
      await sql<UpdatedOrder>`UPDATE orders SET order_status = ${status} WHERE id = ${id} RETURNING *`;
    return queryResult.rows[0];
  }
}
