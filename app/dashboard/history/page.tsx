'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Info } from 'lucide-react';

// Mock data for customer appointment history
const customerAppointments = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    appointments: [
      {
        id: 101,
        date: '2024-03-15',
        type: 'Initial Consultation',
        notes: 'First meeting, discussed goals',
      },
      {
        id: 102,
        date: '2024-03-22',
        type: 'Therapy Session',
        notes: 'Follow-up on initial goals',
      },
      {
        id: 103,
        date: '2024-03-29',
        type: 'Therapy Session',
        notes: 'Continued progress discussion',
      },
    ],
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    appointments: [
      {
        id: 201,
        date: '2024-03-18',
        type: 'Wellness Check',
        notes: 'Annual check-up',
      },
      {
        id: 202,
        date: '2024-03-25',
        type: 'Follow-up Session',
        notes: 'Reviewed test results',
      },
    ],
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    appointments: [
      {
        id: 301,
        date: '2024-03-20',
        type: 'Therapy Session',
        notes: 'Discussed work-related stress',
      },
      {
        id: 302,
        date: '2024-03-27',
        type: 'Therapy Session',
        notes: 'Continued stress management techniques',
      },
    ],
  },
];

export default function CustomerHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredCustomers = customerAppointments.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="mb-8 text-3xl font-bold text-[#2C3E50]">
          Customer Appointment History
        </h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="text-[#7C9885]" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Select
                onValueChange={(value) =>
                  setSelectedCustomer(
                    customerAppointments.find((c) => c.id.toString() === value),
                  )
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customerAppointments.map((customer) => (
                    <SelectItem
                      key={customer.id}
                      value={customer.id.toString()}
                    >
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {selectedCustomer ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCustomer.name}'s Appointment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCustomer.appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        {appointment.notes.substring(0, 50)}...
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSelectedAppointment(appointment)
                              }
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Appointment Details</DialogTitle>
                              <DialogDescription>
                                Detailed information about the selected
                                appointment.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedAppointment && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Date:</span>
                                  <span className="col-span-3">
                                    {selectedAppointment.date}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Type:</span>
                                  <span className="col-span-3">
                                    {selectedAppointment.type}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Notes:</span>
                                  <span className="col-span-3">
                                    {selectedAppointment.notes}
                                  </span>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-[#2C3E50]">
                Select a customer to view their appointment history.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
