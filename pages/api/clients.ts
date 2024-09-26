import { NextApiRequest, NextApiResponse } from 'next';
import {
  CreatedCustomer,
  SelectedCustomer,
} from '@/src/entities/models/customer';
import { createCustomerController } from '@/src/interface-adapters/customers/create-customer.controller';
import { deleteCustomerController } from '@/src/interface-adapters/customers/delete-customer.controller';
import { updateCustomerController } from '@/src/interface-adapters/customers/update-customer.controller';
import { UpdateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';

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
    const { birth_date, email, name, pathology, phone } = req.body;

    if (!birth_date || !(email || phone) || !name || !pathology) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCustomer: CreatedCustomer = {
      birth_date,
      email,
      name,
      pathology,
      phone,
    };

    const createdClient = await createCustomerController(newCustomer);

    return res.status(201).json({
      message: 'Client created successfully',
      createdClient,
    } as CreateClientResponse);
  } else if (req.method === 'PUT') {
    const { birth_date, email, id, name, pathology, phone } = req.body;

    if (!birth_date || !(email || phone) || !id || !name || !pathology) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const payload: UpdateCustomerPayload = {
      birthDate: birth_date,
      email,
      id,
      name,
      pathology,
      phone,
    };

    const updatedClient = await updateCustomerController(payload);

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
