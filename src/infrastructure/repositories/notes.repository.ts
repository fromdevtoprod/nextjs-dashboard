import {
  AddNotesPayload,
  INotesRepository,
  UpdateNotesPayload,
} from '@/src/application/repositories/notes.repository.interface';
import { prisma } from '@/prisma';
import { Notes } from '@/src/entities/models/notes';

export class NotesRepository implements INotesRepository {
  public async add(payload: AddNotesPayload): Promise<Notes> {
    return prisma.note.create({
      data: {
        appointmentId: payload.appointment_id,
        content: payload.content,
      },
    });
  }

  public async delete(appointmentId: string): Promise<void> {
    await prisma.note.deleteMany({
      where: {
        appointmentId,
      },
    });
  }

  public async update(payload: UpdateNotesPayload): Promise<Notes> {
    return prisma.note.update({
      where: {
        id: payload.id,
      },
      data: {
        content: payload.content,
      },
    });
  }
}
