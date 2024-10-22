import { NextApiRequest, NextApiResponse } from 'next';
import { AppointmentWithDateAndTime } from '@/src/entities/models/appointment';
import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { createAppointmentUseCase } from '@/src/application/use-cases/appointments/create-appointment-use-case';
import { deleteAppointmentUseCase } from '@/src/application/use-cases/appointments/delete-appointment.use-case';

export type CreateAppointmentResponse = {
  message: string;
  createdAppointment: AppointmentWithDateAndTime;
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
      is_package,
      package_id,
      payment,
      time,
      userEmail,
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

    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newAppointment: CreateAppointmentPayload = {
      appointment_type_id,
      customer_id,
      date: `${date} ${time}`,
      is_package,
      package_id,
      payment: {
        method: payment.method,
        status: payment.status,
      },
    };

    try {
      const createdAppointment = await createAppointmentUseCase(
        newAppointment,
        userEmail,
      );
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
  } else if (req.method === 'DELETE') {
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
