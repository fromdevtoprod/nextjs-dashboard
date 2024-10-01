import { sql } from '@vercel/postgres';
import {
  CreatePackagePayload,
  IPackagesRepository,
  UpdatePackagePayload,
} from '@/src/application/repositories/packages.repository.interface';
import { SelectedPackage } from '@/src/entities/models/package-model';

export class PackagesRepository implements IPackagesRepository {
  public async countCompletedSessions(): Promise<number> {
    const queryResult = await sql<{ count: number }>`
      SELECT COUNT(*)
      FROM packages
      WHERE remaining_sessions = 0
      AND start_date <= NOW() - INTERVAL '1 month'
    `;
    return queryResult.rows[0].count;
  }

  public async create(payload: CreatePackagePayload): Promise<SelectedPackage> {
    const queryResult = await sql<SelectedPackage>`
      INSERT INTO packages (
        appointment_type_id,
        customer_id,
        remaining_sessions,
        start_date
      ) VALUES (
        ${payload.appointment_type_id},
        ${payload.customer_id},
        ${payload.remaining_sessions},
        ${payload.start_date}
      ) RETURNING *;
    `;
    const { id: package_id } = queryResult.rows[0];
    return this.findById(package_id);
  }

  public async delete(id: string): Promise<void> {
    await sql`
      DELETE FROM packages WHERE id = ${id};
    `;
  }

  public async findAll(): Promise<SelectedPackage[]> {
    const queryResult = await sql<SelectedPackage>`
      SELECT 
        appointment_types.name,
        appointment_types.session_count AS total_sessions,
        customers.name AS customer_name,
        packages.appointment_type_id,
        packages.customer_id,
        packages.id,
        packages.remaining_sessions,
        packages.start_date
      FROM packages
      LEFT JOIN appointment_types ON packages.appointment_type_id = appointment_types.id
      LEFT JOIN customers ON packages.customer_id = customers.id
    `;
    return queryResult.rows;
  }

  public async findById(id: string): Promise<SelectedPackage> {
    const queryResult = await sql<SelectedPackage>`
      SELECT 
        appointment_types.name,
        appointment_types.session_count AS total_sessions,
        customers.name AS customer_name,
        packages.appointment_type_id,
        packages.customer_id,
        packages.id,
        packages.remaining_sessions,
        packages.start_date
      FROM packages
      LEFT JOIN appointment_types ON packages.appointment_type_id = appointment_types.id
      LEFT JOIN customers ON packages.customer_id = customers.id
      WHERE packages.id = ${id}
    `;
    return queryResult.rows[0];
  }

  public async findAllUncompletedPackages(): Promise<SelectedPackage[]> {
    const queryResult = await sql<SelectedPackage>`
      SELECT 
        appointment_types.name,
        appointment_types.session_count AS total_sessions,
        customers.name AS customer_name,
        packages.appointment_type_id,
        packages.customer_id,
        packages.id,
        packages.remaining_sessions,
        packages.start_date
      FROM packages
      LEFT JOIN appointment_types ON packages.appointment_type_id = appointment_types.id
      LEFT JOIN customers ON packages.customer_id = customers.id
      WHERE packages.remaining_sessions > 0
    `;
    return queryResult.rows;
  }

  public async findExistingPackage(
    customer_id: string,
    appointment_type_id: string,
  ): Promise<SelectedPackage | null> {
    const queryResult = await sql<SelectedPackage>`
      SELECT 
        appointment_types.name,
        appointment_types.session_count AS total_sessions,
        customers.name AS customer_name,
        packages.appointment_type_id,
        packages.customer_id,
        packages.id,
        packages.remaining_sessions,
        packages.start_date
      FROM packages
      LEFT JOIN appointment_types ON packages.appointment_type_id = appointment_types.id
      LEFT JOIN customers ON packages.customer_id = customers.id
      WHERE packages.customer_id = ${customer_id}
      AND packages.appointment_type_id = ${appointment_type_id}
      AND packages.remaining_sessions > 0
    `;
    return queryResult.rows[0];
  }

  public async update(payload: UpdatePackagePayload): Promise<SelectedPackage> {
    await sql`
      UPDATE packages
      SET remaining_sessions = ${payload.remaining_sessions}
      WHERE id = ${payload.id};
    `;
    return this.findById(payload.id);
  }
}
