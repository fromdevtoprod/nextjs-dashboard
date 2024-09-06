import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import {
  invoices,
  customers,
  revenue,
  users,
  careCategories,
  careCatalog,
  orders,
  appointments,
  products,
  cureContent,
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
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedCareCategories = await Promise.all(
    careCategories.map(
      (careCategory) => client.sql`
        INSERT INTO care_categories (id, name)
        VALUES (${careCategory.id}, ${careCategory.name})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCareCategories;
}

async function seedCareCatalog() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS care_catalog (
      product_id UUID NOT NULL,
      category_id UUID NOT NULL,
      duration INT NOT NULL
    );
  `;

  const insertedCareCatalog = await Promise.all(
    careCatalog.map(
      (care) => client.sql`
        INSERT INTO care_catalog (product_id, category_id, duration)
        VALUES (${care.product_id}, ${care.category_id}, ${care.duration});
      `,
    ),
  );

  return insertedCareCatalog;
}

async function seedCureContent() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS cure_content (
      product_id UUID NOT NULL,
      care_1_id UUID NOT NULL,
      care_1_session_number INT NOT NULL,
      care_2_id UUID NULL,
      care_2_session_number INT NULL
    );
  `;

  const insertedCureContent = await Promise.all(
    cureContent.map(
      (content) => client.sql`
        INSERT INTO cure_content (product_id, care_1_id, care_1_session_number, care_2_id, care_2_session_number)
        VALUES (${content.product_id}, ${content.care_1_id}, ${content.care_1_session_number}, ${content.care_2_id}, ${content.care_2_session_number});
      `,
    ),
  );

  return insertedCureContent;
}

async function seedProducts() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      amount INT NOT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => client.sql`
        INSERT INTO products (id, name, type, amount)
        VALUES (${product.id}, ${product.name}, ${product.type}, ${product.amount})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedOrders() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      product_id UUID NOT NULL,
      date DATE NOT NULL,
      payment_status VARCHAR(255) NOT NULL,
      order_status VARCHAR(255) NOT NULL
    );
  `;

  const insertedOrders = await Promise.all(
    orders.map(
      (order) => client.sql`
        INSERT INTO orders (id, customer_id, product_id, date, payment_status, order_status)
        VALUES (${order.id}, ${order.customer_id}, ${order.product_id}, ${order.date}, ${order.payment_status}, ${order.order_status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedOrders;
}

async function seedAppointments() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      order_id UUID NOT NULL,
      date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      product_id UUID NOT NULL
    );
  `;

  const insertedAppointments = await Promise.all(
    appointments.map(
      (appointment) => client.sql`
        INSERT INTO appointments (id, order_id, date, end_date, product_id)
        VALUES (${appointment.id}, ${appointment.order_id}, ${appointment.date}, ${appointment.end_date}, ${appointment.product_id})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedAppointments;
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
    await seedCureContent();
    await seedProducts();
    await seedOrders();
    await seedAppointments();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
