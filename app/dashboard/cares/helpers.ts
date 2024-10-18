import { CreatedAppointmentTypePayload } from '@/src/application/repositories/appointment-types.repository.interface';

export function getAppointmentTypePayload(
  formData: FormData,
): CreatedAppointmentTypePayload {
  const duration = parseInt(formData.get('duration') as string);
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const sessionCount = parseInt(formData.get('sessionCount') as string);
  return {
    duration,
    name,
    price,
    sessionCount: sessionCount || 1,
  };
}
