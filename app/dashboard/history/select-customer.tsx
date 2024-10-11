'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectCustomerProps = {
  customers: SelectedCustomer[];
  paramCustomerId: string;
};

export function SelectCustomer({
  customers,
  paramCustomerId,
}: SelectCustomerProps) {
  const t = useTranslations('History');

  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (selectedCustomerId) {
      const newSearchParams = new URLSearchParams(searchParams || {});
      newSearchParams.set('customerId', selectedCustomerId);
      replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [selectedCustomerId]);

  return (
    <Card className="mb-8 w-min">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2">
          <Select onValueChange={setSelectedCustomerId} value={paramCustomerId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t('selectClient')} />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {customer.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
