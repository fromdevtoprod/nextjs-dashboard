// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

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

const appointmentTypes = [
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25a',
    duration: 70,
    name: 'Drainage Lymphatique',
    price: 130,
    session_count: 1,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25b',
    duration: 70,
    name: 'Remodelage',
    price: 150,
    session_count: 1,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25c',
    duration: 30,
    name: 'Miracle Face',
    price: 65,
    session_count: 1,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25d',
    duration: 75,
    name: 'Combo',
    price: 150,
    session_count: 1,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25e',
    duration: 90,
    name: 'Chi Nei Tsang',
    price: 110,
    session_count: 1,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25f',
    duration: 90,
    name: 'Tui Na',
    price: 110,
    session_count: 1,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25g',
    duration: 70,
    name: 'Drainage Lymphatique',
    price: 550,
    session_count: 5,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25h',
    duration: 70,
    name: 'Remodelage',
    price: 650,
    session_count: 5,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25i',
    duration: 30,
    name: 'Miracle Face',
    price: 275,
    session_count: 5,
  },
  {
    id: 'f5becf4e-724c-4c4c-b81e-366050e9d25j',
    duration: 75,
    name: 'Le Combo',
    price: 650,
    session_count: 5,
  },
];

const packages = [
  {
    id: '8680fa16-15cf-4c87-9237-37f52975e9c5',
    appointment_type_id: appointmentTypes[0].id,
    customer_id: customers[0].id,
    remaining_sessions: 3,
    start_date: '2024-09-03',
  },
];

const appointments = [
  {
    id: 'f02ba0df-5f24-4789-b300-244126e438a6',
    appointment_type_id: appointmentTypes[0].id,
    customer_id: customers[0].id,
    date: '2024-09-27',
  },
  {
    id: 'f02ba0df-5f24-4789-b300-244126e438a7',
    appointment_type_id: appointmentTypes[1].id,
    customer_id: customers[1].id,
    date: '2024-09-26',
  },
  {
    id: 'f02ba0df-5f24-4789-b300-244126e438a8',
    appointment_type_id: appointmentTypes[2].id,
    customer_id: customers[2].id,
    date: '2024-09-25',
  },
  {
    id: 'f02ba0df-5f24-4789-b300-244126e438a9',
    appointment_type_id: appointmentTypes[3].id,
    customer_id: customers[3].id,
    date: '2024-09-24',
  },
  {
    id: 'f02ba0df-5f24-4789-b300-244126e438b0',
    appointment_type_id: appointmentTypes[4].id,
    customer_id: customers[4].id,
    date: '2024-09-23',
  },
];

export {
  users,
  customers,
  invoices,
  revenue,
  appointmentTypes,
  packages,
  appointments,
};
