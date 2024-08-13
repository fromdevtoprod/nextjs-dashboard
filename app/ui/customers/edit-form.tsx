import { Customer } from '@/app/lib/definitions';

export default function EditCustomerForm({ customer }: { customer: Customer }) {
  return (
    <form>
      <div>Name : {customer.name}</div>
      <div>Email : {customer.email}</div>
    </form>
  );
}
