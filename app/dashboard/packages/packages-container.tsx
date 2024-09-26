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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Edit, Plus } from 'lucide-react';

// Mock data for packages in progress
const initialPackages = [
  {
    id: 1,
    customerName: 'Alice Johnson',
    packageName: '5 Therapy Sessions',
    totalSessions: 5,
    remainingSessions: 3,
    startDate: '2024-03-01',
    expiryDate: '2024-06-01',
  },
  {
    id: 2,
    customerName: 'Bob Smith',
    packageName: '10 Wellness Checks',
    totalSessions: 10,
    remainingSessions: 8,
    startDate: '2024-02-15',
    expiryDate: '2024-08-15',
  },
  {
    id: 3,
    customerName: 'Carol Williams',
    packageName: '3 Consultation Package',
    totalSessions: 3,
    remainingSessions: 2,
    startDate: '2024-03-10',
    expiryDate: '2024-05-10',
  },
  {
    id: 4,
    customerName: 'David Brown',
    packageName: '8 Follow-up Sessions',
    totalSessions: 8,
    remainingSessions: 5,
    startDate: '2024-01-20',
    expiryDate: '2024-07-20',
  },
];

// Mock data for customers and package types
const customers = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Williams',
  'David Brown',
  'Eva Davis',
];

export function PackagesContainer({ packageTypes }) {
  const [packages, setPackages] = useState(initialPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUpdatePackage = (updatedPackage) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === updatedPackage.id ? updatedPackage : pkg,
      ),
    );
    setEditingPackage(null);
  };

  const handleAddPackage = (newPackage) => {
    setPackages([...packages, { ...newPackage, id: Date.now() }]);
    setIsAddingPackage(false);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2C3E50]">
            Packages in Progress
          </h1>
          <Dialog open={isAddingPackage} onOpenChange={setIsAddingPackage}>
            <DialogTrigger asChild>
              <Button className="bg-[#7C9885] text-white hover:bg-[#6A8A73]">
                <Plus className="mr-2 h-5 w-5" />
                Start New Package
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Package</DialogTitle>
                <DialogDescription>
                  Select a customer and package type to start a new package.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const customerName = formData.get('customerName');
                  const packageName = formData.get('packageName');
                  const packageType = packageTypes.find(
                    (pt) => pt.name === packageName,
                  );
                  const startDate = formData.get('startDate');
                  const expiryDate = new Date(startDate);
                  expiryDate.setDate(
                    expiryDate.getDate() + packageType.duration,
                  );

                  handleAddPackage({
                    customerName,
                    packageName,
                    totalSessions: packageType.session_count,
                    remainingSessions: packageType.session_count,
                    startDate,
                    expiryDate: expiryDate.toISOString().split('T')[0],
                  });
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">
                      Customer
                    </Label>
                    <Select name="customerName" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer} value={customer}>
                            {customer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="packageName" className="text-right">
                      Package Type
                    </Label>
                    <Select name="packageName" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select package type" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageTypes.map((packageType) => (
                          <SelectItem
                            key={packageType.name}
                            value={packageType.name}
                          >
                            {packageType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
                  >
                    Start Package
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="text-[#7C9885]" />
              <Input
                placeholder="Search packages or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Remaining Sessions</TableHead>
                  <TableHead>Start Date</TableHead>
                  {/* <TableHead>Expiry Date</TableHead> */}
                  {/* <TableHead>Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">
                      {pkg.customerName}
                    </TableCell>
                    <TableCell>{pkg.packageName}</TableCell>
                    <TableCell>
                      {pkg.remainingSessions} / {pkg.totalSessions}
                    </TableCell>
                    <TableCell>{pkg.startDate}</TableCell>
                    {/* <TableCell>{pkg.expiryDate}</TableCell> */}
                    {/* <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPackage(pkg)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Package</DialogTitle>
                            <DialogDescription>
                              Update the details of the package in progress.
                            </DialogDescription>
                          </DialogHeader>
                          {editingPackage && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                handleUpdatePackage({
                                  ...editingPackage,
                                  remainingSessions: parseInt(
                                    formData.get('remainingSessions'),
                                  ),
                                  expiryDate: formData.get('expiryDate'),
                                });
                              }}
                            >
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="customerName"
                                    className="text-right"
                                  >
                                    Customer
                                  </Label>
                                  <Input
                                    id="customerName"
                                    value={editingPackage.customerName}
                                    className="col-span-3"
                                    disabled
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="packageName"
                                    className="text-right"
                                  >
                                    Package
                                  </Label>
                                  <Input
                                    id="packageName"
                                    value={editingPackage.packageName}
                                    className="col-span-3"
                                    disabled
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="remainingSessions"
                                    className="text-right"
                                  >
                                    Remaining Sessions
                                  </Label>
                                  <Input
                                    id="remainingSessions"
                                    name="remainingSessions"
                                    type="number"
                                    defaultValue={
                                      editingPackage.remainingSessions
                                    }
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="expiryDate"
                                    className="text-right"
                                  >
                                    Expiry Date
                                  </Label>
                                  <Input
                                    id="expiryDate"
                                    name="expiryDate"
                                    type="date"
                                    defaultValue={editingPackage.expiryDate}
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
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
