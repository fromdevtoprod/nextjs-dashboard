import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
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
import {
  DollarSign,
  HandHelping,
  Package,
  RefreshCcw,
  Text,
  Timer,
} from 'lucide-react';

type AppointmentTypesListProps = {
  appointmentTypes: SelectedAppointmentType[];
  onEditClick: (type: any) => void;
  onDeleteClick: (id: string) => void;
};

export function AppointmentTypesList({
  appointmentTypes,
  onEditClick,
  onDeleteClick,
}: AppointmentTypesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cares</CardTitle>
        <CardDescription>Manage your cares and their settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Duration (minutes)</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointmentTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Text className="mr-2 h-4 w-4 self-center" />
                    {type.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Timer className="mr-2 h-4 w-4 self-center" />
                    {type.duration}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 self-center" />
                    {type.price.toFixed(2)}
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
  if (session_count <= 1) {
    return (
      <div className="flex items-center">
        <HandHelping className="mr-2 h-4 w-4 self-center" />
        Single
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <Package className="mr-2 h-4 w-4 self-center" />
      Package
    </div>
  );
}
