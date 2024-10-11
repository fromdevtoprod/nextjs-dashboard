'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { SelectedPackage } from '@/src/entities/models/package-model';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { Toaster } from '@/components/ui/toaster';
import { StartPackageDialog } from './start-package-dialog';
import { PackageList } from './package-list';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
  const t = useTranslations('Packages');

  const [packages, setPackages] = useState(initialPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [
    hidePackagesWithNoRemainingSessions,
    setHidePackagesWithNoRemainingSessions,
  ] = useState<boolean>(true);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!hidePackagesWithNoRemainingSessions ||
          hidePackagesWithNoRemainingSessions === pkg.remaining_sessions > 0)),
  );

  console.log(
    'hidePackagesWithNoRemainingSessions',
    hidePackagesWithNoRemainingSessions,
  );
  console.log('filteredPackages', filteredPackages);

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

  const toggleRemainingSessionsFilter = () => {
    setHidePackagesWithNoRemainingSessions(
      !hidePackagesWithNoRemainingSessions,
    );
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
            {t('title')}
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
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />

              {/* <div className="flex items-center space-x-2">
                <Label htmlFor="type-filter" className="text-sm font-medium">
                  Filter by Sessions :
                </Label>
                <div className="flex space-x-2">
                  <Badge
                    variant={
                      hidePackagesWithNoRemainingSessions
                        ? 'default'
                        : 'outline'
                    }
                    className="cursor-pointer"
                    onClick={() => toggleRemainingSessionsFilter()}
                  >
                    Hide Packages Without Remaining Session
                  </Badge>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <PackageList filteredPackages={filteredPackages} />

        <Toaster />
      </main>
    </>
  );
}
