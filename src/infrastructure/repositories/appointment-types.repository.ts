import { sql } from '@vercel/postgres';
import { IAppointmentTypesRepository } from '@/src/application/repositories/appointment-types.repository.interface';
import {
  CreatedAppointmentType,
  SelectedAppointmentType,
} from '@/src/entities/models/appointment-types';

export class AppointmentTypesRepository implements IAppointmentTypesRepository {
  public async create(
    payload: CreatedAppointmentType,
  ): Promise<SelectedAppointmentType> {
    const queryResult = await sql<SelectedAppointmentType>`
      INSERT INTO appointment_types (duration, name, price, session_count)
      VALUES (${payload.duration}, ${payload.name}, ${payload.price}, ${payload.session_count})
      RETURNING *`;
    return queryResult.rows[0];
  }

  public async delete(id: string): Promise<void> {
    await sql`DELETE FROM appointment_types WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedAppointmentType[]> {
    const queryResult =
      await sql<SelectedAppointmentType>`SELECT * FROM appointment_types`;
    return queryResult.rows;
  }

  public async findBySessionCountMin(
    sessionCountMin: number,
  ): Promise<SelectedAppointmentType[]> {
    const queryResult = await sql<SelectedAppointmentType>`
      SELECT * FROM appointment_types WHERE session_count >= ${sessionCountMin}`;
    return queryResult.rows;
  }

  public async update(
    payload: SelectedAppointmentType,
  ): Promise<SelectedAppointmentType> {
    const queryResult = await sql<SelectedAppointmentType>`
      UPDATE appointment_types
      SET duration = ${payload.duration},
          name = ${payload.name},
          price = ${payload.price},
          session_count = ${payload.session_count}
      WHERE id = ${payload.id}
      RETURNING *`;
    return queryResult.rows[0];
  }
}
