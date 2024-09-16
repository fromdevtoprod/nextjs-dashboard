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
  public async createCustomer(
    payload: CreateCustomerPayload,
  ): Promise<CreatedCustomer> {
    console.log('Creating customer');
    const queryResult = await sql<CreatedCustomer>`
      INSERT INTO customers(name, email, phone, birth_date, pathology)
      VALUES(${payload.name}, ${payload.email}, ${payload.phone}, ${payload.birthDate}, ${payload.pathology})
      RETURNING *
    `;
    return queryResult.rows[0];
  }

  public async deleteCustomer(id: string): Promise<void> {
    console.log('Deleting customer');
    await sql`DELETE FROM customers WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedCustomer[]> {
    console.log('Finding all customers');
    const queryResult = await sql<SelectedCustomer>`SELECT * FROM customers`;
    return queryResult.rows;
  }

  public async findCustomerById(id: string): Promise<SelectedCustomer> {
    console.log('Finding customer by id');
    const queryResult =
      await sql<SelectedCustomer>`SELECT * FROM customers WHERE id = ${id}`;
    return queryResult.rows[0];
  }

  public async updateCustomer(payload: UpdateCustomerPayload): Promise<any> {
    console.log('Updating customer');
    const queryResult = await sql<UpdatedCustomer>`
      UPDATE customers
      SET name = ${payload.name},
          email = ${payload.email},
          phone = ${payload.phone},
          birth_date = ${payload.birthDate},
          pathology = ${payload.pathology}
      WHERE id = ${payload.id}
      RETURNING *
    `;
    return queryResult.rows[0];
  }
}
