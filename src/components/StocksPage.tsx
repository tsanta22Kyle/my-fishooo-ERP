
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";


interface Stock{
    fishType : string;
    weight : number;
    entryDate : Date;
}
interface Column{
    label:string;
    key:string;
}

function List({ columns, data } : {columns : Column[],data : any[]}) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ plan: "All", status: "All" });
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);

  // --- Filtering logic
  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPlan =
      filters.plan === "All" || item.plan === filters.plan;
    const matchesStatus =
      filters.status === "All" || item.status === filters.status;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredData.length / perPage);

  // --- Handlers
  const handleFilterChange = (field : string, value : string ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
        <h3 className="text-lg font-medium">Gestion des stocks</h3>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Plan Filter */}
          <select
            value={filters.plan}
            onChange={(e) => handleFilterChange("plan", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option>All</option>
            <option>Team</option>
            <option>Basic</option>
            <option>Pro</option>
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              {columns.map((col) => (
                <th key={col.key} className="pb-2 py-3 px-2">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-2 text-gray-700">
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>Results per page:</span>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-2 py-1"
          >
            {[6, 10, 20].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            {page} / {totalPages || 1}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const cols : Column[] = [{key : "1",label:"poisson"},{key:"2",label : "poids"},{key:"3",label : "date"}]

export default function Stocks(){
  return(
    <div className="w-full p-5">
        <List columns={ cols} data={[]} ></List>
    </div>
  )
}