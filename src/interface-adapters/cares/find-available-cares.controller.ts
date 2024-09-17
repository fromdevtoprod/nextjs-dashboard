import { ProductType } from '@/src/application/repositories/orders.repository.interface';
import { findAllCaresUseCase } from '@/src/application/use-cases/cares/find-all-cares.use-case';
import { findCareByIdUseCase } from '@/src/application/use-cases/cares/find-care.use-case';
import { SelectedCare } from '@/src/entities/models/care';
import { countAppointmentsByCareIdController } from '../appointments/count-appointment.controller';
import { findCureByIdController } from '../cures/find-cure.controller';
import { findOrderWithParametersController } from '../orders/find-order-with-parameters.controller';

type FindAllCaresByCurePayload = {
  care_1_id: string;
  care_1_session_number: number;
  care_2_id: string | null;
  care_2_session_number: number;
  orderId: string;
};

type FindAvailableCaresPayload = {
  customerId: string;
  productType: ProductType;
};

export async function findAvailableCaresController({
  customerId,
  productType,
}: FindAvailableCaresPayload) {
  if (productType === 'care') {
    return {
      orderId: '',
      cares: await findAllCaresByCustomerId(customerId),
    };
  }

  const pendingCureOrder = await findOrderWithParametersController({
    customerId,
    status: 'pending',
    type: 'cure',
  });
  if (!pendingCureOrder) {
    return {
      orderId: '',
      cares: [],
    };
  }

  const cure = await findCureByIdController(pendingCureOrder.product_id);
  return {
    orderId: pendingCureOrder.id,
    cares: await findAllCaresByCure({
      care_1_id: cure.care_1_id,
      care_1_session_number: cure.care_1_session_number,
      care_2_id: cure.care_2_id,
      care_2_session_number: cure.care_2_session_number,
      orderId: pendingCureOrder.id,
    }),
  };
}

async function findAllCaresByCustomerId(
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

async function findAllCaresByCure({
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
