import { z } from 'zod';
import { AppointmentTypesWithRemainingSessions } from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';

type CreateAppointmentControllerProps = {
  appointmentTypes: AppointmentTypesWithRemainingSessions[];
  customerId: string;
  isPackage: boolean;
  formData: FormData;
};

type SearchPackageIdProps = {
  appointmentTypes: AppointmentTypesWithRemainingSessions[];
  appointmentTypeId: string;
  customerId: string;
};

const FormSchema = z.object({
  appointment_type_id: z.string(),
  date: z.string(),
  method: z.string(),
  payment: z.string(),
  time: z.string(),
});

export function createAppointmentController({
  appointmentTypes,
  customerId,
  isPackage,
  formData,
}: CreateAppointmentControllerProps) {
  const {
    appointment_type_id,
    date,
    method: paymentMethod,
    payment: paymentStatus,
    time,
  } = FormSchema.parse({
    appointment_type_id: formData.get('type'),
    date: formData.get('date'),
    method: formData.get('method'),
    payment: formData.get('payment'),
    time: formData.get('time'),
  });

  let package_id = null;
  if (isPackage) {
    package_id = searchPackageId({
      appointmentTypes,
      appointmentTypeId: appointment_type_id,
      customerId,
    });
  }

  if (!appointment_type_id || !customerId || !date || !time) {
    throw new Error('All fields are required');
  }

  return {
    appointment_type_id,
    customer_id: customerId,
    date,
    is_package: isPackage,
    payment: {
      method: paymentMethod,
      status: paymentStatus,
    },
    package_id,
    time,
  };
}

function searchPackageId({
  appointmentTypeId,
  appointmentTypes,
  customerId,
}: SearchPackageIdProps) {
  const appointmentType = appointmentTypes.find(
    (type) => type.customerId === customerId,
  );
  if (!appointmentType) {
    return null;
  }
  const foundType = appointmentType.appointmentTypes.find(
    (type) => type.id === appointmentTypeId,
  );
  if (!foundType || !foundType.package_id) {
    return null;
  }
  return foundType.package_id;
}
