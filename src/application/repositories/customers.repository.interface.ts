import { Customer } from '@/src/entities/models/customer';

export type CreateCustomerPayload = {
  address: string;
  birthDate: string;
  city: string;
  email: string;
  name: string;
  pathology: string;
  phone: string;
  postalCode: string;
};

export type UpdateCustomerPayload = CreateCustomerPayload & { id: string };

export interface ICustomersRepository {
  countNewCustomers(): Promise<number>;
  createCustomer(payload: CreateCustomerPayload): Promise<Customer>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Customer[]>;
  updateCustomer(payload: UpdateCustomerPayload): Promise<Customer>;
}
