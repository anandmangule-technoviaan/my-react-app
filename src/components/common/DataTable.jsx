import React, { useState } from 'react';

export default function DataTable({ title, columns, data, searchPlaceholder, searchKey, filterNode, actionNode, onRowClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = data.filter(item => {
    if (!searchKey) return true;
    const value = item[searchKey];
    if (value === undefined || value === null) return false;
    return String(value).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
      <div className="p-5 border-b border-outline-variant/30 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white">
        <div>
          {title && <h3 className="text-lg text-primary font-bold">{title}</h3>}
          <p className="text-xs text-on-surface-variant mt-1">Showing {filteredData.length} records in total</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {searchKey && (
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input
                type="text"
                placeholder={searchPlaceholder || "Search records..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-outline-variant bg-surface-container-low rounded-lg text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          )}
          {filterNode}
          {actionNode}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant/30">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider ${col.headerClassName || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-primary/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-6 py-4 text-sm text-on-surface ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-on-surface-variant">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">inbox</span>
                    <span className="text-sm">No records found matching criteria.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-outline-variant/30 bg-white flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-low transition-all disabled:opacity-50 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-xs">chevron_left</span> Previous
          </button>
          
          <span className="text-xs font-semibold text-on-surface-variant">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-low transition-all disabled:opacity-50 text-xs font-semibold"
          >
            Next <span className="material-symbols-outlined text-xs">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
}
