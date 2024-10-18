export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  pathology: string | null;
  created_at: Date | null;
};
