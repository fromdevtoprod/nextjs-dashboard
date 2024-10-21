import { useTranslations } from 'next-intl';
import { HandHeart, Package, RefreshCcw, Timer } from 'lucide-react';
import { AppointmentType } from '@/src/entities/models/appointment-types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EditButton } from '@/app/ui/buttons/edit-button';
import { DeleteAppointmentTypeConfirmation } from './delete-appointment-type-confirmation';

type AppointmentTypesListProps = {
  appointmentTypes: AppointmentType[];
  onEditClick: (type: any) => void;
  onDeleteClick: (id: string) => void;
};

export function AppointmentTypesList({
  appointmentTypes,
  onEditClick,
  onDeleteClick,
}: AppointmentTypesListProps) {
  const t = useTranslations('Cares');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('cares')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('duration')}</TableHead>
              <TableHead>{t('price')}</TableHead>
              <TableHead>{t('type')}</TableHead>
              <TableHead>{t('sessions')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">{type.name}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Timer className="mr-2 h-4 w-4 self-center" />
                    {type.duration}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {type.price.toFixed(2)}
                    {t('currency')}
                  </div>
                </TableCell>
                <TableCell>
                  <CareTypeBadge session_count={type.session_count} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <RefreshCcw className="mr-2 h-4 w-4 self-center" />
                    {type.session_count}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditButton onClick={() => onEditClick(type)} />
                    <DeleteAppointmentTypeConfirmation
                      careId={type.id}
                      whenDeleteDone={() => onDeleteClick(type.id)}
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

function CareTypeBadge({ session_count }: { session_count: number }) {
  const t = useTranslations('Cares');
  if (session_count <= 1) {
    return (
      <div className="flex items-center">
        <HandHeart className="mr-2 h-4 w-4 self-center" />
        {t('care')}
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <Package className="mr-2 h-4 w-4 self-center" />
      {t('package')}
    </div>
  );
}
