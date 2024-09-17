import {
  findAllCaresByCategoryNameUseCase,
  findAllCaresUseCase,
} from '@/src/application/use-cases/cares/find-all-cares.use-case';
import { findCareByIdUseCase } from '@/src/application/use-cases/cares/find-care.use-case';
import { SelectedCare } from '@/src/entities/models/care';
import { countAppointmentsByCareIdController } from '../appointments/count-appointment.controller';
import { findOrderWithParametersController } from '../orders/find-order.controller';

export type FindAllCaresByCurePayload = {
  care_1_id: string;
  care_1_session_number: number;
  care_2_id: string | null;
  care_2_session_number: number;
  orderId: string;
};

export async function findAllCaresController(): Promise<SelectedCare[]> {
  return findAllCaresUseCase();
}

export async function findAllCaresByCategoryNameController(
  name: string,
): Promise<SelectedCare[]> {
  return findAllCaresByCategoryNameUseCase(name);
}

export async function findAllCaresByCustomerIdController(
  customerId: string,
): Promise<SelectedCare[]> {
  const pendingCareOrder = await findOrderWithParametersController({
    customerId,
    status: 'pending',
    type: 'care',
  });
  if (pendingCareOrder) {
    return Promise.all([findCareByIdUseCase(pendingCareOrder.product_id)]);
  }
  return findAllCaresUseCase();
}

export async function findAllCaresByCure({
  care_1_id,
  care_1_session_number,
  care_2_id,
  care_2_session_number,
  orderId,
}: FindAllCaresByCurePayload): Promise<SelectedCare[]> {
  let availableCares: Promise<SelectedCare>[] = [];

  const care1AppointmentsCount = await countAppointmentsByCareIdController({
    careId: care_1_id,
    orderId,
  });
  if (care_1_session_number > care1AppointmentsCount) {
    availableCares.push(findCareByIdUseCase(care_1_id));
  }

  if (care_2_id) {
    const care2AppointmentsCount = await countAppointmentsByCareIdController({
      careId: care_2_id,
      orderId,
    });
    if (care_2_session_number > care2AppointmentsCount) {
      availableCares.push(findCareByIdUseCase(care_2_id));
    }
  }

  return Promise.all(availableCares);
}
