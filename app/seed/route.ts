import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import {
  invoices,
  customers,
  revenue,
  users,
  appointments,
  appointmentTypes,
  packages,
  notes,
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
      address TEXT,
      birth_date VARCHAR(255) NOT NULL,
      city VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      pathology TEXT
      phone VARCHAR(255) NOT NULL,
      postal_code VARCHAR(255),
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

async function seedAppointments() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      appointment_type_id UUID NOT NULL,
      CONSTRAINT fk_appointment_type_id FOREIGN KEY(appointment_type_id) REFERENCES appointment_types(id),
      customer_id UUID NOT NULL,
      CONSTRAINT fk_customer_id FOREIGN KEY(customer_id) REFERENCES customers(id),
      date TIMESTAMP NOT NULL
      package_id UUID,
      CONSTRAINT fk_package_id FOREIGN KEY(package_id) REFERENCES packages(id)
    );
  `;

  const insertedAppointments = await Promise.all(
    appointments.map(
      (appointment) => client.sql`
        INSERT INTO appointments (id, appointment_type_id, customer_id, date)
        VALUES (${appointment.id}, ${appointment.appointment_type_id}, ${appointment.customer_id}, ${appointment.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedAppointments;
}

async function seedAppointmentTypes() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS appointment_types (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      duration INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      session_count INT NOT NULL
    );
  `;

  const insertedAppointmentTypes = await Promise.all(
    appointmentTypes.map(
      (appointmentType) => client.sql`
        INSERT INTO appointment_types(id, duration, name, price, session_count)
        VALUES (${appointmentType.id}, ${appointmentType.duration}, ${appointmentType.name}, ${appointmentType.price}, ${appointmentType.session_count})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedAppointmentTypes;
}

async function seedPackages() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS packages (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      appointment_type_id UUID NOT NULL,
      CONSTRAINT fk_appointment_type_id FOREIGN KEY(appointment_type_id) REFERENCES appointment_types(id),
      customer_id UUID NOT NULL,
      CONSTRAINT fk_customer_id FOREIGN KEY(customer_id) REFERENCES customers(id),
      remaining_sessions INT NOT NULL,
      start_date TIMESTAMP NOT NULL
    );
  `;

  const insertedPackages = await Promise.all(
    packages.map(
      (packageInProgress) => client.sql`
        INSERT INTO packages(id, appointment_type_id, customer_id, remaining_sessions, start_date)
        VALUES (${packageInProgress.id}, ${packageInProgress.appointment_type_id}, ${packageInProgress.customer_id}, ${packageInProgress.remaining_sessions}, ${packageInProgress.start_date}) 
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPackages;
}

async function seedNotes() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS notes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      appointment_id UUID NOT NULL,
      CONSTRAINT fk_appointment_id FOREIGN KEY(appointment_id) REFERENCES appointments(id),
      content TEXT NOT NULL
    );
  `;

  const insertedNotes = await Promise.all(
    notes.map(
      (note) => client.sql`
        INSERT INTO packages(id, appointment_id, content)
        VALUES (${note.id}, ${note.appointment_id}, ${note.content}) 
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedNotes;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    // await seedAppointmentTypes();
    await seedAppointments();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
