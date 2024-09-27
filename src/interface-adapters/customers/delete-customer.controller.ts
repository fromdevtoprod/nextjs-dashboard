import { deleteAllAppointmentsByClientUseCase } from '@/src/application/use-cases/appointments/delete-all-appointments-by-client.use-case';
import { deleteCustomerUseCase } from '@/src/application/use-cases/customers/delete-customer.use-case';
import { deleteAllPackagesByClientUseCase } from '@/src/application/use-cases/packages/delete-all-packages-by-client.use-case';

export async function deleteCustomerController(id: string) {
  await deleteAllPackagesByClientUseCase(id);
  await deleteAllAppointmentsByClientUseCase(id);
  return deleteCustomerUseCase(id);
}
