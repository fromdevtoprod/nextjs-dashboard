import { CreatedAppointment } from '@/src/entities/models/appointment';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { createOrderUseCase } from '../orders/create-order.use-case';
import { findOrderByIdUseCase } from '../orders/find-order.use-case';
import { countCureTotalSessionNumberUseCase } from '../cures/count-cure-total-session-number';
import { updateOrderUseCase } from '../orders/update-order.use-case';

export type CreateAppointmentUseCasePayload = {
  customerId: string;
  date: string;
  endDate: string;
  orderId: string;
  productId: string;
};

export async function createAppointmentUseCase({
  customerId,
  date,
  endDate,
  productId,
  orderId,
}: CreateAppointmentUseCasePayload): Promise<CreatedAppointment> {
  const appointmentsRepository = new AppointmentsRepository();
  if (!orderId) {
    const createdOrder = await createOrderUseCase({
      customerId,
      date,
      orderStatus: 'pending',
      paymentStatus: 'pending',
      productId,
      productType: 'care',
    });
    orderId = createdOrder.id;
  }
  const createdAppointment = await appointmentsRepository.createAppointment({
    careId: productId,
    date,
    endDate,
    orderId,
  });
  const appointmentsCount =
    await appointmentsRepository.countAppointmentsByOrderId(orderId);
  const order = await findOrderByIdUseCase(orderId);

  if (order.product_type === 'cure') {
    const totalSessionNumber =
      await countCureTotalSessionNumberUseCase(productId);
    if (totalSessionNumber === appointmentsCount) {
      await updateOrderUseCase({ id: orderId, orderStatus: 'completed' });
    }
  } else {
    await updateOrderUseCase({ id: orderId, orderStatus: 'completed' });
  }

  return createdAppointment;
}
