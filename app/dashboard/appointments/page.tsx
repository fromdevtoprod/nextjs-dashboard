'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

// Mock data for appointments
const initialAppointments = [
  {
    id: 1,
    clientName: 'Alice Johnson',
    type: 'Therapy Session',
    date: '2024-03-17',
    time: '10:00 AM',
    packageId: null,
  },
  {
    id: 2,
    clientName: 'Bob Smith',
    type: 'Initial Consultation',
    date: '2024-03-18',
    time: '2:00 PM',
    packageId: null,
  },
  {
    id: 3,
    clientName: 'Carol Williams',
    type: 'Follow-up Session',
    date: '2024-03-19',
    time: '11:30 AM',
    packageId: 1,
  },
];

// Mock data for packages
const clientPackages = [
  {
    id: 1,
    clientName: 'Carol Williams',
    packageName: '5 Therapy Sessions Package',
    sessionsLeft: 4,
  },
  {
    id: 2,
    clientName: 'David Brown',
    packageName: '10 Wellness Check Package',
    sessionsLeft: 8,
  },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
    setIsAddingAppointment(false);
    if (selectedPackage) {
      // Update the sessions left in the package
      const updatedPackages = clientPackages.map((pkg) =>
        pkg.id === selectedPackage.id
          ? { ...pkg, sessionsLeft: pkg.sessionsLeft - 1 }
          : pkg,
      );
      // In a real application, you would update this in your backend
      console.log('Updated packages:', updatedPackages);
    }
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Appointments</h1>
          <Dialog
            open={isAddingAppointment}
            onOpenChange={setIsAddingAppointment}
          >
            <DialogTrigger asChild>
              <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
                <Plus className="mr-2 h-5 w-5" />
                Add Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new appointment or use a package session.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleAddAppointment({
                    clientName: formData.get('clientName'),
                    type: formData.get('type'),
                    date: formData.get('date'),
                    time: formData.get('time'),
                    packageId: selectedPackage ? selectedPackage.id : null,
                  });
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="clientName" className="text-right">
                      Client
                    </Label>
                    <Select name="clientName" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alice Johnson">
                          Alice Johnson
                        </SelectItem>
                        <SelectItem value="Bob Smith">Bob Smith</SelectItem>
                        <SelectItem value="Carol Williams">
                          Carol Williams
                        </SelectItem>
                        <SelectItem value="David Brown">David Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select name="type" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Initial Consultation">
                          Initial Consultation
                        </SelectItem>
                        <SelectItem value="Therapy Session">
                          Therapy Session
                        </SelectItem>
                        <SelectItem value="Follow-up Session">
                          Follow-up Session
                        </SelectItem>
                        <SelectItem value="Wellness Check">
                          Wellness Check
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="package" className="text-right">
                      Use Package
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setSelectedPackage(
                          clientPackages.find(
                            (pkg) => pkg.id === parseInt(value),
                          ),
                        )
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select package (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientPackages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id.toString()}>
                            {pkg.clientName} - {pkg.packageName} (
                            {pkg.sessionsLeft} left)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
                  >
                    Add Appointment
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Package</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.clientName}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        {appointment.packageId ? 'Yes' : 'No'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
