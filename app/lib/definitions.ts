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
  category_id: string;
  category_name: string;
  duration: number;
  product_id: string;
  product_name: string;
  product_amount: number;
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
  product_id: string;
  product_name: string;
  product_amount: number;
  care_1_id: string;
  care_1_session_number: number;
  care_2_id: string;
  care_2_session_number: number;
};

export type Order = {
  id: string;
  customer_id: string;
  customer_name: string;
  product_id: string;
  product_type: 'care' | 'cure';
  product_name: string;
  status: 'pending' | 'paid';
  date: string;
  care_duration?: number;
};

export type Appointment = {
  id: string;
  product_id: string;
  product_name: string;
  product_type: string;
  customer_name: string;
  status: 'pending' | 'done';
  date: string;
  ended_time: string;
  customer_id: string;
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
