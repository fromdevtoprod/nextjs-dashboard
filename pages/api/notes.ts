import { NextApiRequest, NextApiResponse } from 'next';
import {
  AddNotesPayload,
  UpdateNotesPayload,
} from '@/src/application/repositories/notes.repository.interface';
import { addNotesUseCase } from '@/src/application/use-cases/notes/add-notes.use-case';
import { updateNotesUseCase } from '@/src/application/use-cases/notes/update-notes.use-case';
import { Notes } from '@/src/entities/models/notes';

export type AddNotesResponse = {
  message: string;
};

export type UpdateNotesResponse = {
  message: string;
  updatedNotes: Notes;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { appointment_id, content } = req.body;

    if (!appointment_id) {
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
  } else if (req.method === 'PUT') {
    const { id, content } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedNotesPayload: UpdateNotesPayload = {
      id,
      content,
    };

    try {
      const updatedNotes = await updateNotesUseCase(updatedNotesPayload);
      return res.status(201).json({
        message: 'Notes updated successfully',
        updatedNotes,
      } as UpdateNotesResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not update this notes.',
      });
    }
  }
  // else if (req.method === 'DELETE') {
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
