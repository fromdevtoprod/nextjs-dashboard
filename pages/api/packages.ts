import {
  CreatedPackage,
  SelectedPackage,
} from '@/src/entities/models/package-model';
import { createPackageController } from '@/src/interface-adapters/packages/create-package.controller';
import { NextApiRequest, NextApiResponse } from 'next';

export type CreatedPackageResponse = {
  message: string;
  createdPackage: SelectedPackage;
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

    const startedPackage: CreatedPackage = {
      appointment_type_id,
      customer_id,
      remaining_sessions,
      start_date,
    };

    const createdPackage = await createPackageController(startedPackage);

    return res.status(201).json({
      message: 'Package started successfully',
      createdPackage,
    } as CreatedPackageResponse);
  }
  // else if (req.method === 'PUT') {
  //   const { id, name, price, duration, session_count } = req.body;

  //   if (!id || !name || !price || !duration || !session_count) {
  //     return res.status(400).json({ message: 'All fields are required.' });
  //   }

  //   const updatedAppointmentType: SelectedAppointmentType = {
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
