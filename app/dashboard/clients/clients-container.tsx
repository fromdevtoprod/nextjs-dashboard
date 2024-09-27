'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { deleteClient } from '@/app/lib/actions/customers';
import { AddClientDialog } from './add-client-dialog';
import { ClientList } from './client-list';
import { EditClientDialog } from './edit-client-dialog';

type ClientsContainerProps = {
  initialClients: SelectedCustomer[];
};

export function ClientsContainer({ initialClients }: ClientsContainerProps) {
  const [clients, setClients] = useState<SelectedCustomer[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<SelectedCustomer | null>(
    null,
  );

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  );

  const handleAddClient = (newClient: SelectedCustomer) => {
    setClients([...clients, { ...newClient }]);
    setIsAddingClient(false);
  };

  const handleEditClient = async (updatedClient: SelectedCustomer) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );
    setEditingClient(null);
  };

  const handleDeleteClient = async (clientId: string) => {
    await deleteClient(clientId);
    setClients(clients.filter((client) => client.id !== clientId));
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Clients</h1>
          <AddClientDialog
            isOpen={isAddingClient}
            onDialogSubmit={handleAddClient}
            onOpenChange={setIsAddingClient}
          />
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="text-[#7C9885]" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              {/* <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="active">Active Clients</SelectItem>
                  <SelectItem value="inactive">Inactive Clients</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </CardContent>
        </Card>

        <ClientList
          filteredClients={filteredClients}
          onDeleteClick={handleDeleteClient}
          onEditClick={(client) => setEditingClient(client)}
        />
      </main>

      <EditClientDialog
        birthDate={editingClient?.birth_date || ''}
        email={editingClient?.email || ''}
        id={editingClient?.id || ''}
        isOpen={!!editingClient}
        name={editingClient?.name || ''}
        pathology={editingClient?.pathology || ''}
        phone={editingClient?.phone || ''}
        onDialogSubmit={handleEditClient}
        onOpenChange={() => setEditingClient(null)}
      />
    </>
  );
}
