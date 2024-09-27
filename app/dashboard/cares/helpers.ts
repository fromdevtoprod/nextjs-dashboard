import { CreatedAppointmentType } from '@/src/entities/models/appointment-types';

export function getAppointmentTypePayload(
  formData: FormData,
): CreatedAppointmentType {
  const duration = parseInt(formData.get('duration') as string);
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const sessionCount = parseInt(formData.get('sessionCount') as string);
  return {
    duration,
    name,
    price,
    session_count: sessionCount,
  };
}
