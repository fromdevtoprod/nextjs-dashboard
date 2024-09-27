'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AppointmentDetailsDialogProps = {
  date: string;
  id: string;
  notes: string;
  type: string;
};

export function AppointmentDetailsDialog({
  date,
  id,
  notes,
  type,
}: AppointmentDetailsDialogProps) {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpened(true)}>
          <Info className="mr-2 h-4 w-4" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected appointment.
          </DialogDescription>
        </DialogHeader>
        {isOpened && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Date:</span>
              <span className="col-span-3">{date}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Type:</span>
              <span className="col-span-3">{type}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Notes:</span>
              <span className="col-span-3">{notes}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
