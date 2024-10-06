import {
  CreatedCustomer,
  SelectedCustomer,
} from '@/src/entities/models/customer';

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
  createCustomer(payload: CreateCustomerPayload): Promise<CreatedCustomer>;
  deleteCustomer(id: string): Promise<void>;
  findAll(): Promise<SelectedCustomer[]>;
  findCustomerById(id: string): Promise<SelectedCustomer>;
  updateCustomer(payload: UpdateCustomerPayload): Promise<CreatedCustomer>;
}
