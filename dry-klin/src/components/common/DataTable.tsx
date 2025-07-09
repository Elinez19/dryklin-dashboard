import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { MoreDotIcon } from '@/assets/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Column<T> {
  header: string;
  accessor: string & keyof T;
  cell?: (value: unknown) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: { [K in keyof T]: Column<T> & { accessor: K } }[keyof T][];
  data: T[];
  itemsPerPage?: number;
  actions?: {
    label: string;
    onClick: (item: T) => void;
  }[];
}

const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  itemsPerPage = 10,
  actions = [],
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="w-full space-y-4">
      {/* Search and Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Input
          type="search"
          placeholder="Search..."
          className="max-w-full sm:max-w-sm text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md border border-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs sm:text-sm whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md border border-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead 
                    key={String(column.accessor)}
                    className={column.className}
                  >
                    {column.header}
                  </TableHead>
                ))}
                {actions.length > 0 && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell 
                      key={String(column.accessor)}
                      className={column.className}
                    >
                      {column.cell
                        ? column.cell(item[column.accessor])
                        : String(item[column.accessor])}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded-md">
                          <MoreDotIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {actions.map((action, index) => (
                            <DropdownMenuItem
                              key={index}
                              onClick={() => action.onClick(item)}
                              className="text-xs sm:text-sm"
                            >
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DataTable; 