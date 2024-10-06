import { sql } from '@vercel/postgres';
import {
  CreateCustomerPayload,
  ICustomersRepository,
  UpdateCustomerPayload,
} from '@/src/application/repositories/customers.repository.interface';
import {
  CreatedCustomer,
  SelectedCustomer,
  UpdatedCustomer,
} from '@/src/entities/models/customer';

export class CustomersRepository implements ICustomersRepository {
  public async countNewCustomers(): Promise<number> {
    const queryResult = await sql<{ count: number }>`
      SELECT COUNT(*)
      FROM customers
      WHERE created_at >= NOW() - INTERVAL '1 month'
    `;
    return queryResult.rows[0].count;
  }

  public async createCustomer(
    payload: CreateCustomerPayload,
  ): Promise<CreatedCustomer> {
    const queryResult = await sql<CreatedCustomer>`
      INSERT INTO customers(name, email, phone, birth_date, pathology, address, city, postal_code)
      VALUES(${payload.name}, ${payload.email}, ${payload.phone}, ${payload.birthDate}, ${payload.pathology}, ${payload.address}, ${payload.city}, ${payload.postalCode})
      RETURNING *
    `;
    return queryResult.rows[0];
  }

  public async deleteCustomer(id: string): Promise<void> {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedCustomer[]> {
    const queryResult = await sql<SelectedCustomer>`SELECT * FROM customers`;
    return queryResult.rows;
  }

  public async findCustomerById(id: string): Promise<SelectedCustomer> {
    const queryResult =
      await sql<SelectedCustomer>`SELECT * FROM customers WHERE id = ${id}`;
    return queryResult.rows[0];
  }

  public async updateCustomer(payload: UpdateCustomerPayload): Promise<any> {
    const queryResult = await sql<UpdatedCustomer>`
      UPDATE customers
      SET address = ${payload.address},
          birth_date = ${payload.birthDate},
          city = ${payload.city},
          email = ${payload.email},
          name = ${payload.name},
          pathology = ${payload.pathology},
          phone = ${payload.phone},
          postal_code = ${payload.postalCode}
      WHERE id = ${payload.id}
      RETURNING *
    `;
    return queryResult.rows[0];
  }
}
