import { NextApiRequest, NextApiResponse } from 'next';
import { Package } from '@/src/entities/models/package-model';
import { CreatePackagePayload } from '@/src/application/repositories/packages.repository.interface';
import { createPackageUseCase } from '@/src/application/use-cases/packages/create-package.use-case';

export type CreatePackageResponse = {
  message: string;
  createdPackage: Package;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { appointment_type_id, customer_id, remaining_sessions, start_date } =
      req.body;

    if (
      !appointment_type_id ||
      !customer_id ||
      !remaining_sessions ||
      !start_date
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const startedPackage: CreatePackagePayload = {
      appointment_type_id,
      customer_id,
      remaining_sessions,
      start_date,
    };

    try {
      const createdPackage = await createPackageUseCase(startedPackage);

      return res.status(201).json({
        message: 'Package started successfully',
        createdPackage,
      } as CreatePackageResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not start this package.',
      });
    }
  }
  // else if (req.method === 'PUT') {
  //   const { id, name, price, duration, session_count } = req.body;

  //   if (!id || !name || !price || !duration || !session_count) {
  //     return res.status(400).json({ message: 'All fields are required.' });
  //   }

  //   const updatedAppointmentType: AppointmentType = {
  //     duration,
  //     id,
  //     name,
  //     price,
  //     session_count,
  //   };

  //   await updateAppointmentTypeController(updatedAppointmentType);

  //   return res.status(201).json({
  //     message: 'Appointment type updated successfully',
  //     appointmentType: updatedAppointmentType,
  //   });
  // } else if (req.method === 'DELETE') {
  //   const { id } = req.body;

  //   if (!id) {
  //     return res.status(400).json({ message: 'Id is required.' });
  //   }

  //   await deleteAppointmentTypeController(id);

  //   return res.status(201).json({
  //     message: 'Appointment type deleted successfully',
  //     appointmentType: id,
  //   });
  // }
  else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
