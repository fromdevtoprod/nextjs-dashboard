import { NextApiRequest, NextApiResponse } from 'next';
import { UpcomingAppointment } from '@/src/entities/models/appointment';
import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { createAppointmentUseCase } from '@/src/application/use-cases/appointments/create-appointment.use-case';
import { deleteAppointmentUseCase } from '@/src/application/use-cases/appointments/delete-appointment.use-case';

export type CreateAppointmentResponse = {
  message: string;
  createdAppointment: UpcomingAppointment;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {
      appointment_type_id,
      customer_id,
      date,
      package_id,
      payment,
      time,
    } = req.body;

    if (
      !appointment_type_id ||
      !customer_id ||
      !date ||
      !payment.method ||
      !payment.status ||
      !time
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newAppointment: CreateAppointmentPayload = {
      appointment_type_id,
      customer_id,
      date: `${date} ${time}`,
      package_id,
      payment: {
        method: payment.method,
        status: payment.status,
      },
    };

    try {
      const createdAppointment = await createAppointmentUseCase(newAppointment);
      return res.status(201).json({
        message: 'Appointment created successfully',
        createdAppointment,
      } as CreateAppointmentResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not create this appointment.',
      });
    }
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
  // }
  else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is required.' });
    }

    try {
      await deleteAppointmentUseCase(id);
      return res.status(201).json({
        message: 'Appointment deleted successfully',
        appointmentId: id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not delete this appointment.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
