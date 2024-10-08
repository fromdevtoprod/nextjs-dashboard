import { sql } from '@vercel/postgres';
import {
  CreateAppointmentPayload,
  FindAllAppointmentsByDatePayload,
  IAppointmentsRepository,
} from '@/src/application/repositories/appointments.repository.interface';
import {
  HistoryAppointment,
  SelectedAppointment,
  UpcomingAppointment,
} from '@/src/entities/models/appointment';

export class AppointmentsRepository implements IAppointmentsRepository {
  public async countLastYearAppointments(): Promise<number> {
    const queryResult = await sql<{ count: number }>`
      SELECT COUNT(*)
      FROM appointments
      WHERE date >= NOW() - INTERVAL '1 year'
    `;
    return queryResult.rows[0].count;
  }

  public async countAllUpcomingAppointments(): Promise<number> {
    const queryResult = await sql<{ count: number }>`
      SELECT COUNT(*)
      FROM appointments
      WHERE date >= NOW()
    `;
    return queryResult.rows[0].count;
  }

  public async createAppointment(
    payload: CreateAppointmentPayload,
  ): Promise<UpcomingAppointment> {
    const queryResult = await sql<SelectedAppointment>`
      INSERT INTO appointments (
        appointment_type_id,
        customer_id,
        date,
        package_id
      ) VALUES (
        ${payload.appointment_type_id},
        ${payload.customer_id},
        ${payload.date},
        ${payload.package_id}
      ) RETURNING *
    `;
    const createdAppointment = queryResult.rows[0];
    const queryResult2 = await sql<UpcomingAppointment>`
      SELECT
        appointments.id,
        appointments.date,
        appointment_types.name AS appointment_type_name,
        appointment_types.price AS appointment_type_price,
        appointment_types.session_count,
        customers.name AS client_name
      FROM appointments
      LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
      LEFT JOIN customers ON customers.id = appointments.customer_id
      WHERE appointments.id = ${createdAppointment.id}
      `;
    return queryResult2.rows[0];
  }

  public async deleteAppointment(id: string): Promise<void> {
    await sql`DELETE FROM appointments WHERE id = ${id}`;
  }

  public async findAllAppointments(): Promise<SelectedAppointment[]> {
    const queryResult =
      await sql<SelectedAppointment>`SELECT * FROM appointments`;
    return queryResult.rows;
  }

  public async findAllAppointmentsByCustomer(
    customerId: string,
  ): Promise<HistoryAppointment[]> {
    const queryResult = await sql<HistoryAppointment>`
      SELECT appointments.id, appointments.date, appointment_types.name AS type, notes.content as notes
      FROM appointments
      LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
      LEFT JOIN notes ON notes.appointment_id = appointments.id
      WHERE customer_id = ${customerId}
      ORDER BY appointments.date DESC
    `;
    return queryResult.rows;
  }

  public async findAllAppointmentsByDate({
    day,
    month,
    year,
  }: FindAllAppointmentsByDatePayload): Promise<UpcomingAppointment[]> {
    const queryResult = await sql<UpcomingAppointment>`
      SELECT
        appointments.id,
        appointments.date,
        appointment_types.name AS appointment_type_name,
        appointment_types.session_count,
        customers.name AS client_name,
        payments.status AS payment_status
      FROM appointments
      LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
      LEFT JOIN customers ON customers.id = appointments.customer_id
      LEFT JOIN payments ON payments.appointment_id = appointments.id
      WHERE EXTRACT(DAY FROM appointments.date) = ${convertToTwoDigit(day)}
      AND EXTRACT(MONTH FROM appointments.date) = ${convertToTwoDigit(month)}
      AND EXTRACT(YEAR FROM appointments.date) = ${year}
    `;
    return queryResult.rows;
  }

  public async findAllUpcomingAppointments(): Promise<UpcomingAppointment[]> {
    const queryResult = await sql<UpcomingAppointment>`
      SELECT
        appointments.id,
        appointments.date,
        appointment_types.name AS appointment_type_name,
        appointment_types.session_count,
        customers.name AS client_name
      FROM appointments
      LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
      LEFT JOIN customers ON customers.id = appointments.customer_id
      ORDER BY appointments.date
    `;
    return queryResult.rows;
  }

  public async findAppointmentById(id: string): Promise<SelectedAppointment> {
    const queryResult =
      await sql<SelectedAppointment>`SELECT * FROM appointments WHERE id = ${id}`;
    return queryResult.rows[0];
  }
}

function convertToTwoDigit(number: number) {
  return number < 10 ? `0${number}` : number;
}
