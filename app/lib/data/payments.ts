import { SelectedPayment } from '@/src/entities/models/payment';

export async function fetchAllPayments(): Promise<SelectedPayment[]> {
  try {
    const packages = new Promise<SelectedPayment[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            amount: 150,
            appointment_id: '1',
            date: '2024-03-15',
            method: 'Cash',
            package_id: null,
            status: 'Paid',
          },
          {
            id: '2',
            amount: 700,
            appointment_id: null,
            date: '2024-03-10',
            method: 'Check',
            package_id: '1',
            status: 'Pending',
          },
          {
            id: '3',
            amount: 100,
            appointment_id: '2',
            date: '2024-03-18',
            method: 'Transfer',
            package_id: null,
            status: 'Paid',
          },
        ]);
      }, 1000);
    });
    return packages;
  } catch (err) {
    console.error('fetchAllPackages >> findAllPackagesController :', err);
    throw new Error('Failed to fetch all packages.');
  }
}
