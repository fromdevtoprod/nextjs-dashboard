import { sql } from '@vercel/postgres';
import { IPackagesRepository } from '@/src/application/repositories/packages.repository.interface';
import {
  CreatedPackage,
  SelectedPackage,
} from '@/src/entities/models/package-model';

export class PackagesRepository implements IPackagesRepository {
  public async create(payload: CreatedPackage): Promise<SelectedPackage> {
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
}
