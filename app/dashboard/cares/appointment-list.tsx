import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

type AppointmentListProps = {
  appointmentTypes: SelectedAppointmentType[];
  onEditClick: (type: any) => void;
  onDeleteClick: (id: string) => void;
};

export function AppointmentList({
  appointmentTypes,
  onEditClick,
  onDeleteClick,
}: AppointmentListProps) {
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
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell>{type.duration}</TableCell>
                <TableCell>{type.price.toFixed(2)}</TableCell>
                <TableCell>
                  {type.session_count > 1 ? 'Package' : 'Single'}
                </TableCell>
                <TableCell>{type.session_count}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditClick(type)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteClick(type.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
