import { sql } from '@vercel/postgres';
import {
  CountAppointmentsByCareIdPayload,
  CreateAppointmentPayload,
  FindAppointmentsByDatePayload,
  IAppointmentsRepository,
  UpdateAppointmentPayload,
} from '@/src/application/repositories/appointments.repository.interface';
import {
  CreatedAppointment,
  SelectedAppointment,
  UpdatedAppointment,
} from '@/src/entities/models/appointment';

export class AppointmentsRepository implements IAppointmentsRepository {
  public async countAppointmentsByCareId({
    careId,
    orderId,
  }: CountAppointmentsByCareIdPayload): Promise<number> {
    const queryResult =
      await sql`SELECT COUNT(*) FROM appointments WHERE care_id = ${careId} AND order_id = ${orderId}`;
    return queryResult.rows[0].count;
  }

  public async countAppointmentsByOrderId(orderId: string): Promise<number> {
    const queryResult =
      await sql`SELECT COUNT(*) FROM appointments WHERE order_id = ${orderId}`;
    return queryResult.rows[0].count;
  }

  public async createAppointment(
    payload: CreateAppointmentPayload,
  ): Promise<CreatedAppointment> {
    console.log('Creating appointment');
    const queryResult = await sql<CreatedAppointment>`
      INSERT INTO appointments (
        order_id,
        date,
        end_date,
        care_id
      ) VALUES (
        ${payload.orderId},
        ${payload.date},
        ${payload.endDate},
        ${payload.careId}
      ) RETURNING *
    `;
    return queryResult.rows[0];
  }

  public async deleteAppointment(id: string): Promise<void> {
    await sql`DELETE FROM appointments WHERE id = ${id}`;
  }

  public async findAll(): Promise<SelectedAppointment[]> {
    const queryResult = await sql<SelectedAppointment>`
    `;
    return queryResult.rows;
  }

  public async findAppointmentsByDate({
    day,
    month,
    year,
  }: FindAppointmentsByDatePayload): Promise<SelectedAppointment[]> {
    const queryResult = await sql<SelectedAppointment>`
      SELECT
        appointments.id,
        appointments.date,
        appointments.end_date,
        appointments.order_id,
        cares.name AS care_name,
        customers.name AS customer_name,
        orders.customer_id,
        orders.product_type,
        orders.payment_status
      FROM appointments
      LEFT JOIN orders ON orders.id = appointments.order_id
      LEFT JOIN customers ON customers.id = orders.customer_id
      LEFT JOIN cares ON cares.id = appointments.care_id
      WHERE EXTRACT(DAY FROM appointments.date) = ${convertToTwoDigit(day)}
      AND EXTRACT(MONTH FROM appointments.date) = ${convertToTwoDigit(month)}
      AND EXTRACT(YEAR FROM appointments.date) = ${year}
    `;
    return queryResult.rows;
  }

  public async findAppointmentById(id: string): Promise<SelectedAppointment> {
    const queryResult =
      await sql<SelectedAppointment>`SELECT * FROM appointments WHERE id = ${id}`;
    return queryResult.rows[0];
  }

  public async updateAppointment(
    payload: UpdateAppointmentPayload,
  ): Promise<UpdatedAppointment> {
    console.log('Updating appointment');
    const queryResult = await sql<UpdatedAppointment>`
    `;
    return queryResult.rows[0];
  }
}

function convertToTwoDigit(number: number) {
  return number < 10 ? `0${number}` : number;
}
