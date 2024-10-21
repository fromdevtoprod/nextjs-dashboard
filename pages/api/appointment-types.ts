import { NextApiRequest, NextApiResponse } from 'next';
import { AppointmentType } from '@/src/entities/models/appointment-types';
import { createAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/create-appointment-type.use-case';
import { updateAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/update-appointment-type.use-case';
import { deleteAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/delete-appointment-type.use-case';
import {
  CreatedAppointmentTypePayload,
  UpdateAppointmentTypePayload,
} from '@/src/application/repositories/appointment-types.repository.interface';

export type CreateAppointmentTypeResponse = {
  message: string;
  createdAppointmentType: AppointmentType;
};

export type UpdateAppointmentTypeResponse = {
  message: string;
  updatedAppointmentType: AppointmentType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, price, duration, sessionCount, userEmail } = req.body;

    if (!name || !price || !duration || !sessionCount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newAppointmentType: CreatedAppointmentTypePayload = {
      name,
      price,
      duration,
      sessionCount,
    };

    try {
      const createdAppointmentType = await createAppointmentTypeUseCase(
        newAppointmentType,
        userEmail,
      );

      return res.status(201).json({
        message: 'Appointment type created successfully',
        createdAppointmentType,
      } as CreateAppointmentTypeResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not create this appointment type.',
      });
    }
  } else if (req.method === 'PUT') {
    const { id, name, price, duration, sessionCount } = req.body;

    if (!id || !name || !price || !duration || !sessionCount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const appointmentType: UpdateAppointmentTypePayload = {
      duration,
      id,
      name,
      price,
      sessionCount,
    };

    try {
      const updatedAppointmentType =
        await updateAppointmentTypeUseCase(appointmentType);

      return res.status(201).json({
        message: 'Appointment type updated successfully',
        updatedAppointmentType,
      } as UpdateAppointmentTypeResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not update this appointment type.',
      });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is required.' });
    }

    try {
      await deleteAppointmentTypeUseCase(id);

      return res.status(201).json({
        message: 'Appointment type deleted successfully',
        appointmentType: id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not delete this appointment type.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
