import { NextApiRequest, NextApiResponse } from 'next';
import { AddNotesPayload } from '@/src/application/repositories/notes.repository.interface';
import { addNotesUseCase } from '@/src/application/use-cases/notes/add-notes.use-case';

export type AddNotesResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { appointment_id, content } = req.body;

    if (!appointment_id || !content) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newNotes: AddNotesPayload = {
      appointment_id,
      content,
    };

    try {
      await addNotesUseCase(newNotes);

      return res.status(201).json({
        message: 'Notes added successfully',
      } as AddNotesResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not add this notes.',
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
  // } else if (req.method === 'DELETE') {
  //   const { id } = req.body;

  //   if (!id) {
  //     return res.status(400).json({ message: 'Id is required.' });
  //   }

  //   await deleteAppointmentController(id);

  //   return res.status(201).json({
  //     message: 'Appointment deleted successfully',
  //     appointmentId: id,
  //   });
  // }
  else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
