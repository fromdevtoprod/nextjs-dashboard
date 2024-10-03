import { NextApiRequest, NextApiResponse } from 'next';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { deleteCustomerController } from '@/src/interface-adapters/customers/delete-customer.controller';
import {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/src/application/repositories/customers.repository.interface';
import { createCustomerUseCase } from '@/src/application/use-cases/customers/create-customer.use-case';
import { updateCustomerUseCase } from '@/src/application/use-cases/customers/update-customer.use-case';

export type CreateClientResponse = {
  message: string;
  createdClient: SelectedCustomer;
};

export type UpdateClientResponse = {
  message: string;
  updatedClient: SelectedCustomer;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { birthDate, email, name, pathology, phone } = req.body;

    if (!birthDate || !(email || phone) || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCustomer: CreateCustomerPayload = {
      birthDate,
      email,
      name,
      pathology,
      phone,
    };

    const createdClient = await createCustomerUseCase(newCustomer);

    return res.status(201).json({
      message: 'Client created successfully',
      createdClient,
    } as CreateClientResponse);
  } else if (req.method === 'PUT') {
    const { birthDate, email, id, name, pathology, phone } = req.body;

    if (!birthDate || !(email || phone) || !id || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const payload: UpdateCustomerPayload = {
      birthDate,
      email,
      id,
      name,
      pathology,
      phone,
    };

    const updatedClient = await updateCustomerUseCase(payload);

    return res.status(201).json({
      message: 'Client updated successfully',
      updatedClient,
    } as UpdateClientResponse);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is required.' });
    }

    await deleteCustomerController(id);

    return res.status(201).json({
      message: 'Client deleted successfully',
      clientId: id,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
