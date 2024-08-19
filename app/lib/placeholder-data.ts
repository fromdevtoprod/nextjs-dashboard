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
    birth_date: '06/12/1980',
    pathology:
      'Pathology is the study of disease. ... They use their expertise to support every aspect of healthcare, from guiding doctors on the right way to treat common ...',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    phone: '0607080910',
    birth_date: '24/06/1990',
    pathology: '',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    phone: '0607080910',
    birth_date: '02/08/1955',
    pathology: '',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    phone: '0607080910',
    birth_date: '01/01/2000',
    pathology: '',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    phone: '0607080910',
    birth_date: '15/03/1995',
    pathology: '',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    phone: '0607080910',
    birth_date: '30/07/1985',
    pathology: '',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    phone: '0607080910',
    birth_date: '10/10/2010',
    pathology: '',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    phone: '0607080910',
    gender: 'female',
    birth_date: '24/06/1990',
    pathology: '',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    phone: '0607080910',
    birth_date: '17/01/1992',
    pathology: '',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    phone: '0607080910',
    birth_date: '20/05/1988',
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

const careList = [
  {
    id: '074e6ec8-cb9a-4d5e-8f52-c116a4c79d3a',
    care_category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    name: 'Drainage Lymphatique',
    amount: 130,
    duration: 70,
    status: 'active',
  },
  {
    id: '074e6ec8-cb9a-4d5e-8f52-c116a4c79d3b',
    care_category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    name: 'Remodelage',
    amount: 150,
    duration: 70,
    status: 'active',
  },
  {
    id: '074e6ec8-cb9a-4d5e-8f52-c116a4c79d3c',
    care_category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    name: 'Miracle Face',
    amount: 65,
    duration: 30,
    status: 'active',
  },
  {
    id: '074e6ec8-cb9a-4d5e-8f52-c116a4c79d3d',
    care_category_id: 'd10ed416-5896-48da-b966-21e8cbef752a',
    name: 'Combo',
    amount: 150,
    duration: 75,
    status: 'active',
  },
  {
    id: '074e6ec8-cb9a-4d5e-8f52-c116a4c79d3e',
    care_category_id: 'd10ed416-5896-48da-b966-21e8cbef752b',
    name: 'Chi Nei Tsang',
    amount: 110,
    duration: 90,
    status: 'active',
  },
  {
    id: '074e6ec8-cb9a-4d5e-8f52-c116a4c79d3f',
    care_category_id: 'd10ed416-5896-48da-b966-21e8cbef752b',
    name: 'Tui Na',
    amount: 110,
    duration: 90,
    status: 'active',
  },
];

const cureCatalog = [
  {
    id: '3aeaf5b3-f263-4618-a413-b6972ad1df77',
    name: 'Drainage Lymphatique',
    amount: 550,
    status: 'active',
    care_id_1: careList[0].id,
    session_number_1: 5,
  },
  {
    id: '3aeaf5b3-f263-4618-a413-b6972ad1df78',
    name: 'Remodelage',
    amount: 650,
    status: 'active',
    care_id_1: careList[1].id,
    session_number_1: 5,
  },
  {
    id: '3aeaf5b3-f263-4618-a413-b6972ad1df79',
    name: 'Miracle Face',
    amount: 275,
    status: 'active',
    care_id_1: careList[2].id,
    session_number_1: 5,
  },
  {
    id: '3aeaf5b3-f263-4618-a413-b6972ad1df80',
    name: 'Le Combo',
    amount: 650,
    status: 'active',
    care_id_1: careList[0].id,
    session_number_1: 2,
    care_id_2: careList[2].id,
    session_number_2: 3,
  },
  {
    id: '3aeaf5b3-f263-4618-a413-b6972ad1df81',
    name: '2 Drainages & 3 Remodelages',
    amount: 600,
    status: 'active',
    care_id_1: careList[0].id,
    session_number_1: 2,
    care_id_2: careList[1].id,
    session_number_2: 3,
  },
];

const orders = [
  {
    id: '965f7318-4d48-4b81-b6aa-501308597133',
    customer_id: customers[0].id,
    product_id: careList[0].id,
    product_type: 'care',
    date: '2024-06-09',
    status: 'pending',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597134',
    customer_id: customers[1].id,
    product_id: careList[1].id,
    product_type: 'care',
    date: '2023-03-01',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597135',
    customer_id: customers[2].id,
    product_id: careList[2].id,
    product_type: 'care',
    date: '2023-06-18',
    status: 'pending',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597136',
    customer_id: customers[3].id,
    product_id: careList[3].id,
    product_type: 'care',
    date: '2023-06-17',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597137',
    customer_id: customers[4].id,
    product_id: careList[4].id,
    product_type: 'care',
    date: '2023-06-07',
    status: 'pending',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597138',
    customer_id: customers[5].id,
    product_id: careList[5].id,
    product_type: 'care',
    date: '2023-06-03',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597139',
    customer_id: customers[6].id,
    product_id: cureCatalog[0].id,
    product_type: 'cure',
    date: '2023-06-27',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597140',
    customer_id: customers[7].id,
    product_id: cureCatalog[1].id,
    product_type: 'cure',
    date: '2023-06-27',
    status: 'paid',
  },
  {
    id: '965f7318-4d48-4b81-b6aa-501308597141',
    customer_id: customers[8].id,
    product_id: cureCatalog[2].id,
    product_type: 'cure',
    date: '2023-06-27',
    status: 'paid',
  },
];

export {
  users,
  customers,
  invoices,
  revenue,
  careCategories,
  careList,
  cureCatalog,
  orders,
};
