import { Calendar, Package, RefreshCcw, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SelectedPackage } from '@/src/entities/models/package-model';

type PackageListProps = {
  filteredPackages: SelectedPackage[];
};

export function PackageList({ filteredPackages }: PackageListProps) {
  return (
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
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {pkg.customer_name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 self-center" />
                    {pkg.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    {pkg.remaining_sessions} / {pkg.total_sessions}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(pkg.start_date).toISOString().split('T')[0]}
                  </div>
                </TableCell>
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
                                  remaining_sessions: parseInt(
                                    formData.get('remaining_sessions'),
                                  ),
                                  expiryDate: formData.get('expiryDate'),
                                });
                              }}
                            >
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="customer_name"
                                    className="text-right"
                                  >
                                    Customer
                                  </Label>
                                  <Input
                                    id="customer_name"
                                    value={editingPackage.customer_name}
                                    className="col-span-3"
                                    disabled
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="package_name"
                                    className="text-right"
                                  >
                                    Package
                                  </Label>
                                  <Input
                                    id="package_name"
                                    value={editingPackage.package_name}
                                    className="col-span-3"
                                    disabled
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="remaining_sessions"
                                    className="text-right"
                                  >
                                    Remaining Sessions
                                  </Label>
                                  <Input
                                    id="remaining_sessions"
                                    name="remaining_sessions"
                                    type="number"
                                    defaultValue={
                                      editingPackage.remaining_sessions
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
  );
}
