import { NextApiRequest, NextApiResponse } from 'next';
import { Customer } from '@/src/entities/models/customer';
import {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/src/application/repositories/customers.repository.interface';
import { createCustomerUseCase } from '@/src/application/use-cases/customers/create-customer.use-case';
import { updateCustomerUseCase } from '@/src/application/use-cases/customers/update-customer.use-case';
import { deleteCustomerUseCase } from '@/src/application/use-cases/customers/delete-customer.use-case';
import { auth } from '@/auth';

export type CreateClientResponse = {
  message: string;
  createdClient: Customer;
};

export type UpdateClientResponse = {
  message: string;
  updatedClient: Customer;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {
      address,
      birthDate,
      city,
      email,
      name,
      pathology,
      phone,
      postalCode,
      userEmail,
    } = req.body;

    if (!birthDate || !(email || phone) || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newCustomer: CreateCustomerPayload = {
      address,
      birthDate,
      city,
      email,
      name,
      pathology,
      phone,
      postalCode,
    };

    try {
      const createdClient = await createCustomerUseCase(newCustomer, userEmail);
      return res.status(201).json({
        message: 'Client created successfully',
        createdClient,
      } as CreateClientResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not create this client.',
      });
    }
  } else if (req.method === 'PUT') {
    const {
      address,
      birthDate,
      city,
      email,
      id,
      name,
      pathology,
      phone,
      postalCode,
    } = req.body;

    if (!birthDate || !(email || phone) || !id || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const payload: UpdateCustomerPayload = {
      address,
      birthDate,
      city,
      email,
      id,
      name,
      pathology,
      phone,
      postalCode,
    };

    try {
      const updatedClient = await updateCustomerUseCase(payload);

      return res.status(201).json({
        message: 'Client updated successfully',
        updatedClient,
      } as UpdateClientResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not update this client.',
      });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is required.' });
    }

    try {
      await deleteCustomerUseCase(id);

      return res.status(201).json({
        message: 'Client deleted successfully',
        clientId: id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not delete this client.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
