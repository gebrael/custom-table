import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import instance from "../../Utils/Mock";
import Copy from "../Copy";

function Table() {
  const [originalData, setOriginalData] = useState();
  const [data, setData] = useState();
  const [countries, setCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    country_id: "",
  });
  const handleChangeFilter = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    fetchCountries();
    fetchData();
  }, []);
  const fetchData = () => {
    instance
      .get("/users", {
        params: {
          name: filters.name,
          email: filters.email,
          phone: filters.phone,
          company: filters.company,
          date: filters.date,
          country_id: filters.country_id,
        },
      })
      .then((res) => {
        setData([...res.data]);
        setOriginalData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCountries = () => {
    instance
      .get("/country")
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (e) => {
    const results = data?.filter((res) => {
      return (
        res.name.toLowerCase().match(e.toLocaleLowerCase()) ||
        res.company.toLowerCase().match(e.toLocaleLowerCase()) ||
        res.date.toLowerCase().match(e.toLocaleLowerCase()) ||
        res.email.toLowerCase().match(e.toLocaleLowerCase()) ||
        res.phone.toLowerCase().match(e.toLocaleLowerCase())
      );
    });
    setData(results);
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => {
        return (
          <div className="flex gap-3">
            {row.id.slice(0, 4) + "....." + row.id.slice(-4)}
            <Copy item={row.id} />
          </div>
        );
      },
    },
    {
      name: "Name",
      selector: (row) => {
        return row.name;
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => {
        return (
          <div className="flex gap-3">
            {row.email}
            <Copy item={row.email} />
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => {
        return (
          <div className="flex gap-3">
            {row.phone}
            <Copy item={row.phone} />
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => {
        return row.company;
      },
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        return row.date;
      },
    },
    {
      name: "Country",
      selector: (row) => {
        if (countries.length > 0) {
          return countries.filter((c) => c.country_id == row.country_id)[0]
            ?.country_name;
        }
      },
      sortable: true,
    },
  ];

  const subHeaderComponentMemo = (
    <div className="w-full flex justify-between ">
      <div className="w-[200px] flex justify-start border-r-2 border-slate-300">
        <h1 className="text-xl">Heros</h1>
      </div>
      <div className="flex gap-3 ">
        <div className="flex gap-2 flex-row-reverse">
          <button
            className={` py-1 px-3 rounded-lg ease-in-out duration-300  hover:bg-sky-50 ${
              expandSearch ? "bg-blue-50 " : "bg-transparent"
            }`}
            onClick={() => setExpandSearch(!expandSearch)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            className={` border-b border-slate-100 absolute md:static left-0 top-[30%] focus:outline-none focus:border-blue-500 ${
              expandSearch ? "px-3 md:w-[300px]" : "w-[0px]"
            }`}
            type="text"
            placeholder="Search Here..."
            onChange={(e) => {
              e.target.value != ""
                ? handleSearch(e.target.value)
                : setData(originalData);
            }}
          />
        </div>
        <button
          className={` py-1 px-2 rounded-lg ease-in-out duration-300  hover:bg-sky-50 ${
            showFilters ? "bg-blue-50 " : "bg-transparent"
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="fa-solid fa-sliders"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-5 flex flex-col md:flex-row gap-5 ">
      <div
        className={`md:w-1/4 w-full flex-col items-center justify-start bg-white rounded-lg ${
          showFilters ? "flex" : "hidden"
        }`}
      >
        {/* Header */}
        <div className="w-full py-11 border-b border-slate-300 flex items-center justify-center">
          <h1 className="text-6xl text-slate-800 font-bold">Filters</h1>
        </div>

        {/* Inputs Form */}
        <div className="w-[90%] p-3 flex flex-col items-center  gap-7">
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="name"
            id="name"
            onChange={handleChangeFilter}
          />

          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChangeFilter}
          />

          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Phone"
            id="phone"
            onChange={handleChangeFilter}
          />

          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Company"
            id="company"
            onChange={handleChangeFilter}
          />
          <select
            className="w-full p-3 pl-2 cursor-pointer border-b border-slate-100 focus:outline-none focus:border-blue-500"
            id="country_id"
            onChange={handleChangeFilter}
          >
            <option defaultValue>Choose a country</option>
            {countries.map((country, key) => (
              <option key={key} value={country.country_id}>
                {country.country_name}
              </option>
            ))}
          </select>
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="date"
            placeholder="Date"
            id="date"
            onChange={handleChangeFilter}
          />

          <button
            onClick={fetchData}
            className="flex gap-2 items-center justify-center rounded-md py-2 px-5 text-white bg-blue-500 "
          >
            <i className="fa-solid fa-filter"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white h-[90vh] p-2 w-full rounded-lg">
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          fixedHeaderScrollHeight="90%"
          dense
          highlightOnHover
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      </div>
    </div>
  );
}

export default Table;
