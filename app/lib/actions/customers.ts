'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string(),
  phone: z.string(),
  birth_date: z.string().min(1, { message: 'Birth date is required' }),
  pathology: z.string(),
});

const CreateCustomer = FormSchema.omit({ id: true });

export async function createCustomer(prevState: State, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    birth_date: formData.get('birth_date'),
    pathology: formData.get('pathology'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Customer.',
    };
  }

  const { name, email, phone, birth_date, pathology } = validatedFields.data;
  const formattedBirthDate = formatBirthDate(birth_date);

  if (phone === '' && email === '') {
    return {
      errors: {
        phone: ['Phone or email is required'],
        email: ['Email or phone is required'],
      },
      message: 'Missing fields. Failed to Create Customer.',
    };
  }

  try {
    await sql`
              INSERT INTO customers (name, email, phone, birth_date, pathology) 
              VALUES (${name}, ${email}, ${phone}, ${formattedBirthDate}, ${pathology})
            `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function updateCustomer(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    birth_date: formData.get('birth_date'),
    pathology: formData.get('pathology'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Customer.',
    };
  }

  const { name, email, phone, birth_date, pathology } = validatedFields.data;
  const formattedBirthDate = formatBirthDate(birth_date);

  if (phone === '' && email === '') {
    return {
      errors: {
        phone: ['Phone or email is required'],
        email: ['Email or phone is required'],
      },
      message: 'Missing fields. Failed to Create Customer.',
    };
  }

  try {
    await sql`
                UPDATE customers
                SET name = ${name},
                  email = ${email},
                  phone = ${phone},
                  birth_date = ${formattedBirthDate},
                  pathology = ${pathology}
                WHERE id = ${id}
            `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

function formatBirthDate(birthDate: string) {
  const [day, month, year] = birthDate.split('/');
  return `${year}-${month}-${day}`;
}
