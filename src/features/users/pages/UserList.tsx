import { useState } from 'react'
import { Search, Filter, Eye, MoreVertical } from 'lucide-react'
import DataTable, { ColumnDef } from '../../../common/components/DataTable'

// 1. Define the TypeScript Interface for User Data
interface CitizenUser {
    id: string
    fullName: string
    email: string
    phone: string
    status: 'Active' | 'Suspended' | 'Unverified'
    joinedAt: string
}

// 2. Generate Mock Data (Will be replaced by RTK Query later)
const MOCK_USERS: CitizenUser[] = [
    { id: 'USR-1001', fullName: 'Rahul Kumar', email: 'rahul.k@example.com', phone: '+91-9876543210', status: 'Active', joinedAt: '2025-10-12' },
    { id: 'USR-1002', fullName: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91-9876543211', status: 'Active', joinedAt: '2025-11-05' },
    { id: 'USR-1003', fullName: 'Amit Singh', email: 'amit.singh99@example.com', phone: '+91-9123456789', status: 'Suspended', joinedAt: '2026-01-20' },
    { id: 'USR-1004', fullName: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91-9988776655', status: 'Unverified', joinedAt: '2026-02-15' },
    { id: 'USR-1005', fullName: 'Vikram Patel', email: 'v.patel@example.com', phone: '+91-9000111222', status: 'Active', joinedAt: '2026-02-20' },
]

export default function UserList() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // 3. Define Table Columns mapping to the CitizenUser type
    const userColumns: ColumnDef<CitizenUser>[] = [
        { header: 'Citizen ID', accessorKey: 'id' },
        {
            header: 'Citizen Details',
            cell: (user) => (
                <div>
                    <p className="font-bold text-slate-800">{user.fullName}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                </div>
            )
        },
        { header: 'Phone Number', accessorKey: 'phone' },
        {
            header: 'Account Status',
            cell: (user) => {
                const statusStyles = {
                    Active: 'bg-green-100 text-green-700 border-green-200',
                    Suspended: 'bg-red-100 text-red-700 border-red-200',
                    Unverified: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                }
                return (
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusStyles[user.status]}`}>
                        {user.status}
                    </span>
                )
            }
        },
        { header: 'Joined Date', accessorKey: 'joinedAt' },
        {
            header: 'Actions',
            cell: (user) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => alert(`Viewing details for ${user.fullName}`)}
                        className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                        title="View Full Profile"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ]

    return (
        <div className="page-wrapper">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
                    <p className="text-sm text-slate-500 mt-1">View, manage, and verify citizen accounts.</p>
                </div>

                {/* Filters and Search */}
                <div className="flex items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field !py-2 !pl-9" // Overriding global padding slightly
                        />
                    </div>
                    <button className="btn-secondary !py-2">
                        <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* Reusable Generic Data Table */}
            <DataTable
                columns={userColumns}
                data={MOCK_USERS}
                currentPage={currentPage}
                totalPages={5} // Mock total pages
                onPageChange={setCurrentPage}
            />
        </div>
    )
}