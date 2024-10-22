import {
  CreatedAppointmentTypePayload,
  IAppointmentTypesRepository,
} from '@/src/application/repositories/appointment-types.repository.interface';
import { AppointmentType } from '@/src/entities/models/appointment-types';

export class AppointmentTypesRepositoryMock
  implements IAppointmentTypesRepository
{
  public create(
    payload: CreatedAppointmentTypePayload,
    userId: string,
  ): Promise<AppointmentType> {
    return Promise.resolve({
      id: '1',
      name: 'name',
      duration: 30,
      price: 30,
      session_count: 1,
    });
  }

  public async delete(id: string): Promise<void> {
    return;
  }

  public async findAll(): Promise<AppointmentType[]> {
    return [
      {
        id: '1',
        name: 'name',
        duration: 30,
        price: 30,
        session_count: 1,
      },
    ];
  }

  public async findById(id: string): Promise<AppointmentType | null> {
    return {
      id: '1',
      name: 'name',
      duration: 30,
      price: 30,
      session_count: 1,
    };
  }

  public async findBySessionCountMin(
    sessionCountMin: number,
  ): Promise<AppointmentType[]> {
    return [
      {
        id: '1',
        name: 'name',
        duration: 30,
        price: 30,
        session_count: 1,
      },
    ];
  }

  public async update(): Promise<AppointmentType> {
    return {
      id: '1',
      name: 'name',
      duration: 30,
      price: 30,
      session_count: 1,
    };
  }
}
