import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomerAppointments } from './customer-appointments';

type CustomerHistoryProps = {
  selectedCustomer: any;
};

export function CustomerHistory({ selectedCustomer }: CustomerHistoryProps) {
  if (!selectedCustomer) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-[#2C3E50]">
            Select a customer to view their appointment history.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${selectedCustomer.name}'s Appointment History`}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Date</TableHead>
              <TableHead className="w-[200px]">Type</TableHead>
              <TableHead>Notes</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            <CustomerAppointments selectedCustomerId={selectedCustomer.id} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
