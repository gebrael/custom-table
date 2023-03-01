import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let instance = axios.create({
  baseURL: "https://table.com/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

let mock = new MockAdapter(instance);

const employees_data = [
  {
    id: "1e98f131e-846q-1551-rthf-f45602d9a0g1",
    name: "Eslam",
    email: "test@test.com",
    phone: "00201234567899",
    company: "Nasa",
    date: "2010-10-16",
    country_id: "1",
  },
  {
    id: "2e98f131e-846q-1551-rthf-f45602d9a452",
    name: "Hebba",
    email: "test2@test.com",
    phone: "00206234567899",
    company: "MicroSoft",
    date: "2020-08-15",
    country_id: "1",
  },
  {
    id: "3e98f131e-846q-1551-jthf-f45602d9a0g3",
    name: "Hossam",
    email: "test3@test.com",
    phone: "00201234667899",
    company: "Google",
    date: "2021-12-05",
    country_id: "2",
  },
  {
    id: "4e98f131e-846q-1551-rthf-l45602d9a0g4",
    name: "Jo",
    email: "test4@test.com",
    phone: "00201274567899",
    company: "Nasa",
    date: "2005-02-10",
    country_id: "1",
  },
  {
    id: "5e98f131e-846q-6551-rthf-f45602d9a0g5",
    name: "Sarah",
    email: "test5@test.com",
    phone: "00201234564899",
    company: "FaceBook",
    date: "2020-02-10",
    country_id: "3",
  },
  {
    id: "6e98f131e-846q-1551-rthf-f45602d9a0g6",
    name: "Yara",
    email: "test6@test.com",
    phone: "00241234567899",
    company: "Apple",
    date: "2010-07-10",
    country_id: "5",
  },
];

mock.onGet("/users").reply(function ({ params }) {
  let employees = employees_data;

  if (params?.name && params?.name?.length > 0) {
    employees = employees.filter((em) =>
      em.name.toLowerCase().includes(params.name.toLowerCase())
    );
  }

  if (params?.email && params?.email?.length > 0) {
    employees = employees.filter((em) =>
      em.email.toLowerCase().includes(params.email.toLowerCase())
    );
  }
  if (params?.company && params?.company?.length > 0) {
    employees = employees.filter((em) =>
      em.company.toLowerCase().includes(params.company.toLowerCase())
    );
  }
  if (params?.phone && params?.phone?.length > 0) {
    employees = employees.filter((em) => em.phone.includes(params.phone));
  }
  if (params?.date && params?.date?.length > 0) {
    employees = employees.filter((em) => em.date == params.date);
  }
  if (params?.country_id && params?.country_id?.length > 0) {
    employees = employees.filter((em) => em.country_id == params.country_id);
  }

  return [200, employees];
});
mock.onGet("/country").reply(200, {
  data: [
    {
      country_id: "1",
      country_name: "Saudi Arabia",
    },
    {
      country_id: "2",
      country_name: "Egypt",
    },
    {
      country_id: "3",
      country_name: "Poland",
    },
    {
      country_id: "4",
      country_name: "Moraco",
    },
    {
      country_id: "5",
      country_name: "Greece",
    },
    {
      country_id: "6",
      country_name: "Serbia",
    },
  ],
  count: 6,
  total: 6,
  page: 1,
  pageCount: 1,
});
export default instance;
