import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';
import { deleteAllPackagesByClientUseCase } from '../packages/delete-all-packages-by-client.use-case';
import { deleteAllAppointmentsByClientUseCase } from '../appointments/delete-all-appointments-by-client.use-case';

export async function deleteCustomerUseCase(id: string) {
  await deleteAllPackagesByClientUseCase(id);
  await deleteAllAppointmentsByClientUseCase(id);
  return new CustomersRepository().delete(id);
}
