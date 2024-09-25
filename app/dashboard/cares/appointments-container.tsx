'use client';

import { useState } from 'react';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { AddAppointmentTypeDialog } from './add-appointment-type-dialog';
import { EditAppointmentTypeDialog } from './edit-appointment-type-dialog';
import { AppointmentList } from './appointment-list';
import { getDeleteRequest } from './helpers';

type AppointmentsContainerProps = {
  initialAppointmentTypes: SelectedAppointmentType[];
};

export function AppointmentsContainer({
  initialAppointmentTypes,
}: AppointmentsContainerProps) {
  const [appointmentTypes, setAppointmentTypes] = useState(
    initialAppointmentTypes,
  );
  const [isAddingType, setIsAddingType] = useState(false);
  const [editingType, setEditingType] =
    useState<SelectedAppointmentType | null>(null);

  const handleAddType = (newType: SelectedAppointmentType) => {
    setAppointmentTypes([...appointmentTypes, { ...newType }]);
    setIsAddingType(false);
  };

  const handleEditType = async (updatedType: SelectedAppointmentType) => {
    setAppointmentTypes(
      appointmentTypes.map((type) =>
        type.id === updatedType.id ? updatedType : type,
      ),
    );
    setEditingType(null);
  };

  const handleDeleteType = async (id: string) => {
    await getDeleteRequest(id);
    setAppointmentTypes(appointmentTypes.filter((type) => type.id !== id));
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2C3E50]">
            Appointment Types
          </h1>
          <AddAppointmentTypeDialog
            isOpen={isAddingType}
            onOpenChange={() => setIsAddingType(!isAddingType)}
            onDialogSubmit={handleAddType}
          />
        </div>

        <AppointmentList
          appointmentTypes={appointmentTypes}
          onEditClick={(type) => setEditingType(type)}
          onDeleteClick={handleDeleteType}
        />
      </main>

      <EditAppointmentTypeDialog
        duration={editingType?.duration || 0}
        id={editingType?.id || ''}
        isOpen={!!editingType}
        onOpenChange={() => setEditingType(null)}
        onDialogSubmit={handleEditType}
        name={editingType?.name || ''}
        price={editingType?.price || 0}
        sessionCount={editingType?.session_count || 0}
      />
    </>
  );
}
