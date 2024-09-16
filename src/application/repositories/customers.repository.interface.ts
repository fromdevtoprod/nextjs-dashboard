import { CreatedCustomer } from '@/src/entities/models/customer';

export type CreateCustomerPayload = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  pathology: string;
};

export interface ICustomersRepository {
  createCustomer(payload: CreateCustomerPayload): Promise<CreatedCustomer>;
}
