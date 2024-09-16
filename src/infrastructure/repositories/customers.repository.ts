import { sql } from '@vercel/postgres';
import {
  CreateCustomerPayload,
  ICustomersRepository,
} from '@/src/application/repositories/customers.repository.interface';
import { CreatedCustomer } from '@/src/entities/models/customer';

export class CustomersRepository implements ICustomersRepository {
  public async createCustomer({
    name,
    email,
    phone,
    birthDate,
    pathology,
  }: CreateCustomerPayload): Promise<CreatedCustomer> {
    console.log('Creating customer');
    const queryResult = await sql<CreatedCustomer>`
      INSERT INTO customers(name, email, phone, birth_date, pathology)
      VALUES(${name}, ${email}, ${phone}, ${birthDate}, ${pathology})
      RETURNING *
    `;
    return queryResult.rows[0];
  }
}
