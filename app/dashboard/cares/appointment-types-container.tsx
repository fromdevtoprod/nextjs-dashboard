'use client';

import { useState } from 'react';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { deleteAppointmentType } from '@/app/lib/actions/appointment-types';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { AddAppointmentTypeDialog } from './add-appointment-type-dialog';
import { EditAppointmentTypeDialog } from './edit-appointment-type-dialog';
import { AppointmentTypesList } from './appointment-types-list';

type AppointmentTypesContainerProps = {
  initialAppointmentTypes: SelectedAppointmentType[];
};

export function AppointmentTypesContainer({
  initialAppointmentTypes,
}: AppointmentTypesContainerProps) {
  const [appointmentTypes, setAppointmentTypes] = useState(
    initialAppointmentTypes,
  );
  const [isAddingType, setIsAddingType] = useState(false);
  const [editingType, setEditingType] =
    useState<SelectedAppointmentType | null>(null);

  const { toast } = useToast();

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
    try {
      await deleteAppointmentType(id);
      setAppointmentTypes(appointmentTypes.filter((type) => type.id !== id));
    } catch (error) {
      console.error(error);
      toast({
        description: 'We could not delete this appointment type.',
        title: 'Sorry, something went wrong !',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
            Cares
          </h1>
          <AddAppointmentTypeDialog
            isOpen={isAddingType}
            onOpenChange={() => setIsAddingType(!isAddingType)}
            onDialogSubmit={handleAddType}
          />
        </div>

        <AppointmentTypesList
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

      <Toaster />
    </>
  );
}
