import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { createOrderUseCase } from '../orders/create-order.use-case';
import { findOrderByIdUseCase } from '../orders/find-order.use-case';
import { updateOrderUseCase } from '../orders/update-order.use-case';
import { findCureByIdUseCase } from '../cures/find-cure.use-case';

export type CreateAppointmentUseCasePayload = {
  customerId: string;
  date: string;
  endDate: string;
  orderId: string;
  productId: string;
};

const appointmentsRepository = new AppointmentsRepository();

export async function createAppointmentUseCase({
  customerId,
  date,
  endDate,
  productId,
  orderId,
}: CreateAppointmentUseCasePayload): Promise<any> {
  const orderEntity = await getOrderEntity({
    orderId,
    customerId,
    date,
    productId,
  });

  orderId = orderEntity.getId();
  await appointmentsRepository.createAppointment({
    careId: productId,
    date,
    endDate,
    orderId,
  });

  const appointmentIds = await getAppointmentIds(orderId);
  const order = await findOrderByIdUseCase(orderId);

  if (order.isCare()) {
    return completeOrder(orderId);
  }

  const cure = await findCureByIdUseCase(productId);
  if (cure.isCompleted(appointmentIds)) {
    return completeOrder(orderId);
  }
}

function completeOrder(orderId: string) {
  return updateOrderUseCase({ id: orderId, orderStatus: 'completed' });
}

async function getAppointmentIds(orderId: string) {
  const appointments =
    await appointmentsRepository.findAppointmentsByOrderId(orderId);
  return appointments.map((appointment) => appointment.getId());
}

function getOrderEntity({
  orderId,
  customerId,
  date,
  productId,
}: {
  orderId: string;
  customerId: string;
  date: string;
  productId: string;
}) {
  if (!orderId) {
    return createOrderUseCase({
      customerId,
      date,
      orderStatus: 'pending',
      paymentStatus: 'pending',
      productId,
      productType: 'care',
    });
  }
  return findOrderByIdUseCase(orderId);
}
