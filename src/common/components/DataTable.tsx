import React from 'react'
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react'

// 1. Defining strict generic types for absolute type safety
export interface ColumnDef<T> {
    header: string
    accessorKey?: keyof T // Use this if directly mapping to a simple string/number
    cell?: (item: T) => React.ReactNode // Use this for custom UI (buttons, badges)
}

interface DataTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    isLoading?: boolean
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function DataTable<T>({
    data,
    columns,
    isLoading = false,
    currentPage,
    totalPages,
    onPageChange
}: DataTableProps<T>) {

    // 2. Handling Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
                <p className="text-slate-500 font-medium">Loading records...</p>
            </div>
        )
    }

    // 3. Handling Empty State
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="p-4 bg-slate-50 rounded-full mb-3">
                    <Inbox className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No records found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">We couldn't find any data matching your current filters or search criteria.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="px-6 py-4">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        {/* If a custom cell renderer exists, use it. Otherwise, fallback to object key */}
                                        {col.cell ? col.cell(item) : String(col.accessorKey ? item[col.accessorKey] : '')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm text-slate-500 font-medium">
                    Page <span className="text-slate-800 font-bold">{currentPage}</span> of <span className="text-slate-800 font-bold">{totalPages}</span>
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}