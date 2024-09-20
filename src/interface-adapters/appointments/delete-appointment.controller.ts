import {
  deleteAppointmentUseCase,
  DeleteAppointmentUseCasePayload,
} from '@/src/application/use-cases/appointments/delete-appointment.use-case';

export async function deleteAppointmentController(
  payload: DeleteAppointmentUseCasePayload,
) {
  return deleteAppointmentUseCase(payload);
}
