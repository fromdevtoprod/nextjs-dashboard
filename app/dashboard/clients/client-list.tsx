import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { DeleteClientConfirmation } from './delete-client-confirmation';

type ClientListProps = {
  filteredClients: SelectedCustomer[];
  onEditClick: (client: SelectedCustomer) => void;
  onDeleteClick: (id: string) => void;
};

export function ClientList({
  filteredClients,
  onDeleteClick,
  onEditClick,
}: ClientListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              {/* <TableHead>Last Appointment</TableHead>
              <TableHead>Next Appointment</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{getAgeFromBirthDate(client.birth_date)}</TableCell>
                <TableCell>{client.city}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                {/* <TableCell>{client.lastAppointment}</TableCell>
                <TableCell>{client.nextAppointment}</TableCell> */}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditClick(client)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DeleteClientConfirmation
                      clientId={client.id}
                      whenDeleteDone={() => onDeleteClick(client.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function getAgeFromBirthDate(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
