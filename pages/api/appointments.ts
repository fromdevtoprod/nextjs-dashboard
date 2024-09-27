import { NextApiRequest, NextApiResponse } from 'next';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { createAppointmentController } from '@/src/interface-adapters/appointments/create-appointment.controller';
import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';

export type CreateAppointmentResponse = {
  message: string;
  createdAppointment: UpcomingAppointment;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { appointment_type_id, client_id, date, time } = req.body;

    if (!appointment_type_id || !client_id || !date || !time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newAppointment: CreateAppointmentPayload = {
      appointment_type_id,
      client_id,
      date: `${date} ${time}`,
    };

    const createdAppointment =
      await createAppointmentController(newAppointment);

    return res.status(201).json({
      message: 'Appointment created successfully',
      createdAppointment,
    } as CreateAppointmentResponse);
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
