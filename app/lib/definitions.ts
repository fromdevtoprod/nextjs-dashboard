// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  pathology: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  amount: string;
};

export type Care = {
  id: string;
  category: string;
  name: string;
  amount: number;
  duration: number;
  status: 'active' | 'inactive';
};

export type CareCategory = {
  id: string;
  name: string;
};

export type CureContent = {
  care_id: string;
  session_number: number;
};

export type Cure = {
  id: string;
  name: string;
  content: CureContent[];
  amount: number;
  status: 'active' | 'inactive';
  care_id_1: string;
  session_number_1: number;
  care_id_2: string;
  session_number_2: number;
};

export type CureWithCareData = Cure & {
  total_cares: number;
  total_sessions: number;
};

export type Order = {
  id: string;
  customer_id: number;
  customer_name: string;
  product_id: number;
  product_type: 'care' | 'cure';
  status: 'pending' | 'paid';
  date: string;
  product_name: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
