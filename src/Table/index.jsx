import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Table() {
  const [showFilters, setShowFilters] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 3,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 4,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 6,
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 5,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const subHeaderComponentMemo = (
    <div className="w-full flex justify-between ">
      <div className="w-[200px] flex justify-start border-r-2 border-slate-300">
        <h1 className="text-xl">Heros</h1>
      </div>
      <div className="flex gap-3">
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
            className={` border-b border-slate-100 focus:outline-none focus:border-blue-500 ${
              expandSearch ? "px-3 w-[300px]" : "w-[0px]"
            }`}
            type="text"
            placeholder="Search Here..."
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
          <h1 className="text-2xl">Filters</h1>
        </div>

        {/* Inputs Form */}
        <div className="w-[90%] p-3 flex flex-col items-center  gap-7">
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Phone"
          />
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Company"
          />
          <select className="w-full p-3 pl-2 border-b border-slate-100 focus:outline-none focus:border-blue-500">
            <option defaultValue className="text-blue-200">
              Choose a country
            </option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <input
            className="w-full p-3 border-b border-slate-100 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Date"
          />
          <button className="flex gap-2 items-center justify-center rounded-md py-2 px-5 text-white bg-blue-500 ">
            <i className="fa-solid fa-filter"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white h-[90vh] p-2 w-full rounded-lg ">
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
