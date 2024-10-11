import { sql } from '@vercel/postgres';
import { CustomersTableType } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import { findCustomerByIdController } from '@/src/interface-adapters/customers/find-customer.controller';
import { findAllCustomersController } from '@/src/interface-adapters/customers/find-all-customers.controller';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { countNewCustomersUseCase } from '@/src/application/use-cases/customers/count-new-customers.use-case';

export async function fetchAllCustomers(): Promise<SelectedCustomer[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const customers = await findAllCustomersController();
    return customers;
  } catch (error) {
    console.error('fetchAllCustomers >> findAllCustomersController', error);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const customer = await findCustomerByIdController(id);
    return customer;
  } catch (error) {
    console.error('fetchCustomerById >> findCustomerByIdController', error);
    throw new Error('Failed to fetch this customer.');
  }
}

export async function countNewCustomers(): Promise<number> {
  try {
    const newCustomersCount = await countNewCustomersUseCase();
    return newCustomersCount;
  } catch (error) {
    console.error('countNewCustomers >> countNewCustomersUseCase', error);
    throw new Error('Failed to count new customers.');
  }
}
