'use client';

import { useState } from 'react';
import { AddAppointmentDialog } from '@/components/add-appointment-dialog';
import { CustomerField } from '@/app/lib/definitions';

export function AppointmentsHeader({
  customers,
}: {
  customers: CustomerField[];
}) {
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-[#2C3E50]">Appointments</h1>
      <AddAppointmentDialog
        customers={customers}
        isOpen={isAddingAppointment}
        onOpenChange={setIsAddingAppointment}
      />
    </div>
  );
}
