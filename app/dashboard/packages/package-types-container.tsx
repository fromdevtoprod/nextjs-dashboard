'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedPackage } from '@/src/entities/models/package-model';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { StartPackageDialog } from './start-package-dialog';
import { PackageList } from './package-list';

type PackageTypesContainerProps = {
  customers: SelectedCustomer[];
  initialPackages: SelectedPackage[];
  packageTypes: SelectedAppointmentType[];
};

export function PackageTypesContainer({
  customers,
  initialPackages,
  packageTypes,
}: PackageTypesContainerProps) {
  const [packages, setPackages] = useState(initialPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUpdatePackage = (updatedPackage: SelectedPackage) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === updatedPackage.id ? updatedPackage : pkg,
      ),
    );
    setEditingPackage(null);
  };

  const handleAddPackage = (newPackage: SelectedPackage) => {
    setPackages([...packages, { ...newPackage }]);
    setIsAddingPackage(false);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2C3E50]">
            Packages in Progress
          </h1>
          <StartPackageDialog
            customers={customers}
            isOpen={isAddingPackage}
            packageTypes={packageTypes}
            onOpenChange={setIsAddingPackage}
            onDialogSubmit={handleAddPackage}
          />
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

        <PackageList filteredPackages={filteredPackages} />
      </main>
    </>
  );
}
