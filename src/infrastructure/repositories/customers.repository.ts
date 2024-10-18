import {
  CreateCustomerPayload,
  ICustomersRepository,
  UpdateCustomerPayload,
} from '@/src/application/repositories/customers.repository.interface';
import { Customer } from '@/src/entities/models/customer';
import { prisma } from '@/prisma';

export class CustomersRepository implements ICustomersRepository {
  public async countNewCustomers(): Promise<number> {
    return prisma.customer.count({
      where: {
        created_at: {
          gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
        },
      },
    });
  }

  public async createCustomer(
    payload: CreateCustomerPayload,
  ): Promise<Customer> {
    return prisma.customer.create({
      data: {
        address: payload.address,
        birth_date: payload.birthDate,
        city: payload.city,
        email: payload.email,
        name: payload.name,
        pathology: payload.pathology,
        phone: payload.phone,
        postal_code: payload.postalCode,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<Customer[]> {
    return prisma.customer.findMany();
  }

  public async updateCustomer(
    payload: UpdateCustomerPayload,
  ): Promise<Customer> {
    return prisma.customer.update({
      where: {
        id: payload.id,
      },
      data: {
        address: payload.address,
        birth_date: payload.birthDate,
        city: payload.city,
        email: payload.email,
        name: payload.name,
        pathology: payload.pathology,
        phone: payload.phone,
        postal_code: payload.postalCode,
      },
    });
  }
}
