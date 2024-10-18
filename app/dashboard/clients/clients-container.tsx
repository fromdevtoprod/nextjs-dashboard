'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Customer } from '@/src/entities/models/customer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { AddClientDialog } from './add-client-dialog';
import { ClientList } from './client-list';
import { EditClientDialog } from './edit-client-dialog';
import { useTranslations } from 'next-intl';

type ClientsContainerProps = {
  initialClients: Customer[];
};

export function ClientsContainer({ initialClients }: ClientsContainerProps) {
  const t = useTranslations('Clients');

  const [clients, setClients] = useState<Customer[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Customer | null>(null);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm),
  );

  const handleAddClient = (newClient: Customer) => {
    setClients([...clients, { ...newClient }]);
    setIsAddingClient(false);
  };

  const handleEditClient = async (updatedClient: Customer) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );
    setEditingClient(null);
  };

  const handleDeleteClient = async (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="mb-4 text-2xl font-bold text-[#2C3E50] md:mb-0 md:text-3xl">
            {t('title')}
          </h1>
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
                placeholder={t('search.placeholder')}
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

      {editingClient && (
        <EditClientDialog
          address={editingClient?.address || ''}
          birthDate={editingClient?.birth_date || ''}
          city={editingClient?.city || ''}
          email={editingClient?.email || ''}
          id={editingClient?.id || ''}
          isOpen={!!editingClient}
          name={editingClient?.name || ''}
          pathology={editingClient?.pathology || ''}
          phone={editingClient?.phone || ''}
          postalCode={editingClient?.postal_code || ''}
          onDialogSubmit={handleEditClient}
          onOpenChange={() => setEditingClient(null)}
        />
      )}

      <Toaster />
    </>
  );
}
