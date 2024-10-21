import { useTranslations } from 'next-intl';
import { Cake, House, Mail, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Customer } from '@/src/entities/models/customer';
import { DeleteClientConfirmation } from './delete-client-confirmation';
import { EditButton } from '@/app/ui/buttons/edit-button';

type ClientListProps = {
  filteredClients: Customer[];
  onEditClick: (client: Customer) => void;
  onDeleteClick: (id: string) => void;
};

export function ClientList({
  filteredClients,
  onDeleteClick,
  onEditClick,
}: ClientListProps) {
  const t = useTranslations('Clients');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('clientList')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('age')}</TableHead>
              <TableHead>{t('city')}</TableHead>
              <TableHead>{t('email')}</TableHead>
              <TableHead>{t('phone')}</TableHead>
              {/* <TableHead>Last Appointment</TableHead>
              <TableHead>Next Appointment</TableHead> */}
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {client.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Cake className="mr-2 h-4 w-4" />
                    {getAgeFromBirthDate(client.birth_date)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {client.city && <House className="mr-2 h-4 w-4" />}
                    {client.city}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {client.email && <Mail className="mr-2 h-4 w-4" />}
                    {client.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {client.phone && <Phone className="mr-2 h-4 w-4" />}
                    {client.phone}
                  </div>
                </TableCell>
                {/* <TableCell>{client.lastAppointment}</TableCell>
                <TableCell>{client.nextAppointment}</TableCell> */}
                <TableCell>
                  <div className="flex space-x-2">
                    <EditButton onClick={() => onEditClick(client)} />
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
