import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import {
  invoices,
  customers,
  revenue,
  users,
  careCategories,
  careList,
  cureList,
} from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      birth_date VARCHAR(255) NOT NULL,
      pathology TEXT
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, phone, birth_date, pathology)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.phone}, ${customer.birth_date}, ${customer.pathology})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

async function seedCareCategories() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS care_categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedCare = await Promise.all(
    careCategories.map(
      (careCategory) => client.sql`
        INSERT INTO care_categories (id, name, status)
        VALUES (${careCategory.id}, ${careCategory.name}, ${careCategory.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCare;
}

async function seedCareCatalog() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS care_catalog (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      care_category_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      duration INT NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedCare = await Promise.all(
    careList.map(
      (care) => client.sql`
        INSERT INTO care_catalog (id, care_category_id, name, amount, duration, status)
        VALUES (${care.id}, ${care.care_category_id}, ${care.name}, ${care.amount}, ${care.duration}, ${care.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCare;
}

async function seedCure() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS cure (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      session_number INT NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedCare = await Promise.all(
    cureList.map(
      (cure) => client.sql`
        INSERT INTO cure (id, name, amount, session_number, status)
        VALUES (${cure.id}, ${cure.name}, ${cure.amount}, ${cure.session_number}, ${cure.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCare;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    await seedCareCategories();
    await seedCareCatalog();
    await seedCure();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
