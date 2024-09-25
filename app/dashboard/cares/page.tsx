'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import {
  CalendarDays,
  Heart,
  Users,
  Clipboard,
  BarChart2,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';

// Mock appointment types data
const initialAppointmentTypes = [
  {
    id: 1,
    name: 'Initial Consultation',
    duration: 60,
    color: '#7C9885',
    price: 150,
    isPackage: false,
  },
  {
    id: 2,
    name: 'Follow-up Session',
    duration: 45,
    color: '#A4C3D2',
    price: 100,
    isPackage: false,
  },
  {
    id: 3,
    name: 'Therapy Session',
    duration: 50,
    color: '#D68C45',
    price: 120,
    isPackage: false,
  },
  {
    id: 4,
    name: 'Wellness Check',
    duration: 30,
    color: '#6A8A73',
    price: 80,
    isPackage: false,
  },
  {
    id: 5,
    name: '5 Therapy Sessions Package',
    duration: 50,
    color: '#A4C3D2',
    price: 550,
    isPackage: true,
    sessionCount: 5,
  },
];

export default function AppointmentTypesPage() {
  const [appointmentTypes, setAppointmentTypes] = useState(
    initialAppointmentTypes,
  );
  const [isAddingType, setIsAddingType] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const handleAddType = (newType) => {
    setAppointmentTypes([...appointmentTypes, { ...newType, id: Date.now() }]);
    setIsAddingType(false);
  };

  const handleEditType = (updatedType) => {
    setAppointmentTypes(
      appointmentTypes.map((type) =>
        type.id === updatedType.id ? updatedType : type,
      ),
    );
    setEditingType(null);
  };

  const handleDeleteType = (id) => {
    setAppointmentTypes(appointmentTypes.filter((type) => type.id !== id));
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2C3E50]">
            Appointment Types
          </h1>
          <Dialog open={isAddingType} onOpenChange={setIsAddingType}>
            <DialogTrigger asChild>
              <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
                <Plus className="mr-2 h-5 w-5" />
                Add Appointment Type
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Appointment Type</DialogTitle>
                <DialogDescription>
                  Create a new appointment type or package for your schedule.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const isPackage = formData.get('isPackage') === 'on';
                  handleAddType({
                    name: formData.get('name'),
                    duration: parseInt(formData.get('duration')),
                    color: formData.get('color'),
                    price: parseFloat(formData.get('price')),
                    isPackage: isPackage,
                    sessionCount: isPackage
                      ? parseInt(formData.get('sessionCount'))
                      : null,
                  });
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">
                      Duration (minutes)
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="color" className="text-right">
                      Color
                    </Label>
                    <Input
                      id="color"
                      name="color"
                      type="color"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isPackage" className="text-right">
                      Is Package?
                    </Label>
                    <Switch id="isPackage" name="isPackage" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sessionCount" className="text-right">
                      Sessions in Package
                    </Label>
                    <Input
                      id="sessionCount"
                      name="sessionCount"
                      type="number"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
                  >
                    Add Type
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Types</CardTitle>
            <CardDescription>
              Manage your appointment types, packages, and their settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Duration (minutes)</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Price ($)</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell className="font-medium">{type.name}</TableCell>
                    <TableCell>{type.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className="mr-2 h-6 w-6 rounded-full"
                          style={{ backgroundColor: type.color }}
                        ></div>
                        {type.color}
                      </div>
                    </TableCell>
                    <TableCell>{type.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {type.isPackage ? 'Package' : 'Single'}
                    </TableCell>
                    <TableCell>
                      {type.isPackage ? type.sessionCount : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingType(type)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteType(type.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Edit Appointment Type Dialog */}
      <Dialog
        open={editingType !== null}
        onOpenChange={() => setEditingType(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment Type</DialogTitle>
            <DialogDescription>
              Make changes to the appointment type or package here.
            </DialogDescription>
          </DialogHeader>
          {editingType && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const isPackage = formData.get('isPackage') === 'on';
                handleEditType({
                  id: editingType.id,
                  name: formData.get('name'),
                  duration: parseInt(formData.get('duration')),
                  color: formData.get('color'),
                  price: parseFloat(formData.get('price')),
                  isPackage: isPackage,
                  sessionCount: isPackage
                    ? parseInt(formData.get('sessionCount'))
                    : null,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={editingType.name}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-duration" className="text-right">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="edit-duration"
                    name="duration"
                    type="number"
                    defaultValue={editingType.duration}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-color" className="text-right">
                    Color
                  </Label>
                  <Input
                    id="edit-color"
                    name="color"
                    type="color"
                    defaultValue={editingType.color}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingType.price}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-isPackage" className="text-right">
                    Is Package?
                  </Label>
                  <Switch
                    id="edit-isPackage"
                    name="isPackage"
                    defaultChecked={editingType.isPackage}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-sessionCount" className="text-right">
                    Sessions in Package
                  </Label>
                  <Input
                    id="edit-sessionCount"
                    name="sessionCount"
                    type="number"
                    defaultValue={editingType.sessionCount}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
