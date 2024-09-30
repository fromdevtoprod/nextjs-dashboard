import {
  CreatedCustomer,
  SelectedCustomer,
} from '@/src/entities/models/customer';

export type CreateCustomerPayload = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  pathology: string;
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
