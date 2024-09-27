'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
