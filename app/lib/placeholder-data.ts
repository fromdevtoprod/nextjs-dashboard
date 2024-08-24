// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

import { date } from 'zod';

// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    phone: '0607080910',
    birth_date: '1980-06-12',
    pathology:
      'Pathology is the study of disease. ... They use their expertise to support every aspect of healthcare, from guiding doctors on the right way to treat common ...',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    phone: '0607080910',
    birth_date: '1990-06-24',
    pathology: '',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    phone: '0607080910',
    birth_date: '1955-08-02',
    pathology: '',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    phone: '0607080910',
    birth_date: '2000-01-01',
    pathology: '',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    phone: '0607080910',
    birth_date: '1995-03-15',
    pathology: '',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    phone: '0607080910',
    birth_date: '1985-07-30',
    pathology: '',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    phone: '0607080910',
    birth_date: '2010-10-10',
    pathology: '',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    phone: '0607080910',
    gender: 'female',
    birth_date: '1990-06-24',
    pathology: '',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    phone: '0607080910',
    birth_date: '1992-01-17',
    pathology: '',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    phone: '0607080910',
    birth_date: '1988-05-20',
    pathology: '',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const careCategories = [
  {
    id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    name: 'Renata França',
    status: 'active',
  },
  {
    id: 'd10ed416-5896-48da-b966-21e8cbef752b',
    name: 'Médecine Chinoise',
    status: 'active',
  },
];

const careCatalog = [
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd84',
    category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    duration: 70,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd85',
    category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    duration: 70,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd86',
    category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    duration: 30,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd87',
    category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    duration: 75,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd88',
    category_id: 'd10ed416-5896-48da-b966-21e8cbef752b',
    duration: 90,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd89',
    category_id: 'd10ed416-5896-48da-b966-21e8cbef752b',
    duration: 90,
  },
];

const cureContent = [
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd90',
    care_1_id: 'cb58f01f-2260-4db2-b068-1451286bdd84',
    care_1_session_number: 5,
    care_2_id: null,
    care_2_session_number: null,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd91',
    care_1_id: 'cb58f01f-2260-4db2-b068-1451286bdd85',
    care_1_session_number: 5,
    care_2_id: null,
    care_2_session_number: null,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd92',
    care_1_id: 'cb58f01f-2260-4db2-b068-1451286bdd86',
    care_1_session_number: 5,
    care_2_id: null,
    care_2_session_number: null,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd93',
    care_1_id: 'cb58f01f-2260-4db2-b068-1451286bdd87',
    care_1_session_number: 5,
    care_2_id: null,
    care_2_session_number: null,
  },
  {
    product_id: 'cb58f01f-2260-4db2-b068-1451286bdd94',
    care_1_id: 'cb58f01f-2260-4db2-b068-1451286bdd84',
    care_1_session_number: 2,
    care_2_id: 'cb58f01f-2260-4db2-b068-1451286bdd85',
    care_2_session_number: 3,
  },
];

const products = [
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd84',
    name: 'Drainage Lymphatique',
    type: 'care',
    amount: 130,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd85',
    name: 'Remodelage',
    type: 'care',
    amount: 150,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd86',
    name: 'Miracle Face',
    type: 'care',
    amount: 65,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd87',
    name: 'Combo',
    type: 'care',
    amount: 150,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd90',
    name: 'Drainage Lymphatique',
    type: 'cure',
    amount: 550,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd91',
    name: 'Remodelage',
    type: 'cure',
    amount: 650,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd92',
    name: 'Miracle Face',
    type: 'cure',
    amount: 275,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd93',
    name: 'Le Combo',
    type: 'cure',
    amount: 650,
  },
  {
    id: 'cb58f01f-2260-4db2-b068-1451286bdd94',
    name: '2 Drainages & 3 Remodelages',
    type: 'cure',
    amount: 600,
  },
];

const orders = [
  {
    id: '965f7318-4d48-4b81-b6aa-501308597133',
    customer_id: customers[0].id,
    product_id: products[0].id,
    date: '2024-06-09',
    status: 'pending',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597134',
    customer_id: customers[1].id,
    product_id: products[1].id,
    date: '2023-03-01',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597135',
    customer_id: customers[2].id,
    product_id: products[2].id,
    date: '2023-06-18',
    status: 'pending',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597136',
    customer_id: customers[3].id,
    product_id: products[3].id,
    date: '2023-06-17',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597137',
    customer_id: customers[4].id,
    product_id: products[4].id,
    date: '2023-06-07',
    status: 'pending',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597138',
    customer_id: customers[5].id,
    product_id: products[5].id,
    date: '2023-06-03',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597139',
    customer_id: customers[6].id,
    product_id: products[6].id,
    date: '2023-06-27',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597140',
    customer_id: customers[7].id,
    product_id: products[7].id,
    date: '2023-06-27',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597141',
    customer_id: customers[8].id,
    product_id: products[8].id,
    date: '2023-06-27',
    status: 'paid',
  },
];

const appointments = [
  {
    id: '10b2eeaa-3150-4e04-a7bc-c3f7f3f7a5ad',
    order_id: orders[0].id,
    date: '2024-08-21 09:00:00',
    ended_time: '2024-08-21 10:10:00',
  },
  {
    id: '10b2eeaa-3150-4e04-a7bc-c3f7f3f7a5ae',
    order_id: orders[1].id,
    date: '2024-08-21 10:30:00',
    ended_time: '2024-08-21 11:40:00',
  },
  {
    id: '10b2eeaa-3150-4e04-a7bc-c3f7f3f7a5af',
    order_id: orders[2].id,
    date: '2024-08-21 12:00:00',
    ended_time: '2024-08-21 12:30:00',
  },
  {
    id: '10b2eeaa-3150-4e04-a7bc-c3f7f3f7a5b0',
    order_id: orders[3].id,
    date: '2024-08-21 14:00:00',
    ended_time: '2024-08-21 15:15:00',
  },
  {
    id: '10b2eeaa-3150-4e04-a7bc-c3f7f3f7a5b1',
    order_id: orders[4].id,
    date: '2024-08-21 16:15:00',
    ended_time: '2024-08-21 17:45:00',
  },
];

export {
  users,
  customers,
  invoices,
  revenue,
  careCategories,
  careCatalog,
  cureContent,
  products,
  orders,
  appointments,
};
