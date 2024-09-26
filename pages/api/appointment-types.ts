import { NextApiRequest, NextApiResponse } from 'next';
import { createAppointmentTypeController } from '@/src/interface-adapters/appointment-types/create-appointment-type.controller';
import { deleteAppointmentTypeController } from '@/src/interface-adapters/appointment-types/delete-appointment-type.controller';
import { updateAppointmentTypeController } from '@/src/interface-adapters/appointment-types/update-appointment-type.controller';
import {
  CreatedAppointmentType,
  SelectedAppointmentType,
} from '@/src/entities/models/appointment-types';

export type CreateAppointmentTypeResponse = {
  message: string;
  createdAppointmentType: SelectedAppointmentType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, price, duration, session_count } = req.body;

    if (!name || !price || !duration || !session_count) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newAppointmentType: CreatedAppointmentType = {
      name,
      price,
      duration,
      session_count,
    };

    const createdAppointmentType =
      await createAppointmentTypeController(newAppointmentType);

    return res.status(201).json({
      message: 'Appointment type created successfully',
      createdAppointmentType,
    } as CreateAppointmentTypeResponse);
  } else if (req.method === 'PUT') {
    const { id, name, price, duration, session_count } = req.body;

    if (!id || !name || !price || !duration || !session_count) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedAppointmentType: SelectedAppointmentType = {
      duration,
      id,
      name,
      price,
      session_count,
    };

    await updateAppointmentTypeController(updatedAppointmentType);

    return res.status(201).json({
      message: 'Appointment type updated successfully',
      appointmentType: updatedAppointmentType,
    });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is required.' });
    }

    await deleteAppointmentTypeController(id);

    return res.status(201).json({
      message: 'Appointment type deleted successfully',
      appointmentType: id,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
