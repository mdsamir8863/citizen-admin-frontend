import { useState } from 'react'
import { Search, Filter, CheckCircle, XCircle, FileText } from 'lucide-react'
import DataTable, { ColumnDef } from '../../../common/components/DataTable'

// 1. Define the TypeScript Interface for Services
interface CitizenService {
    applicationId: string
    serviceName: string
    applicantName: string
    appliedDate: string
    status: 'Pending' | 'Approved' | 'Rejected'
}

// 2. Mock Data (Will be replaced by RTK Query later)
const MOCK_SERVICES: CitizenService[] = [
    { applicationId: 'APP-8001', serviceName: 'Passport Renewal', applicantName: 'Rahul Kumar', appliedDate: '2026-02-20', status: 'Pending' },
    { applicationId: 'APP-8002', serviceName: 'Voter ID Correction', applicantName: 'Priya Sharma', appliedDate: '2026-02-18', status: 'Approved' },
    { applicationId: 'APP-8003', serviceName: 'New Ration Card', applicantName: 'Amit Singh', appliedDate: '2026-02-15', status: 'Rejected' },
    { applicationId: 'APP-8004', serviceName: 'Driving License Renewal', applicantName: 'Neha Gupta', appliedDate: '2026-02-25', status: 'Pending' },
]

export default function ServiceList() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // 3. Define Table Columns mapping to the CitizenService type
    const serviceColumns: ColumnDef<CitizenService>[] = [
        { header: 'App ID', accessorKey: 'applicationId' },
        {
            header: 'Service Details',
            cell: (service) => (
                <div>
                    <p className="font-bold text-slate-800">{service.serviceName}</p>
                    <p className="text-xs text-slate-500">Applicant: {service.applicantName}</p>
                </div>
            )
        },
        { header: 'Date Applied', accessorKey: 'appliedDate' },
        {
            header: 'Application Status',
            cell: (service) => {
                const statusStyles = {
                    Approved: 'bg-green-100 text-green-700 border-green-200',
                    Rejected: 'bg-red-100 text-red-700 border-red-200',
                    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                }
                return (
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusStyles[service.status]}`}>
                        {service.status}
                    </span>
                )
            }
        },
        {
            header: 'Admin Actions',
            cell: (service) => (
                <div className="flex items-center gap-2">
                    {/* View Document Button */}
                    <button
                        className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                        title="Review Documents"
                    >
                        <FileText className="w-4 h-4" />
                    </button>

                    {/* Conditional Action Buttons based on Status */}
                    {service.status === 'Pending' && (
                        <>
                            <button
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                title="Approve Service"
                                onClick={() => alert(`Approved ${service.applicationId}`)}
                            >
                                <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Reject Service"
                                onClick={() => alert(`Rejected ${service.applicationId}`)}
                            >
                                <XCircle className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            )
        }
    ]

    return (
        <div className="page-wrapper">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Service Applications</h2>
                    <p className="text-sm text-slate-500 mt-1">Review, approve, or reject citizen service requests.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search Application ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field !py-2 !pl-9"
                        />
                    </div>
                    <button className="btn-secondary !py-2">
                        <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* Reusing our previously built Generic Data Table! */}
            <DataTable
                columns={serviceColumns}
                data={MOCK_SERVICES}
                currentPage={currentPage}
                totalPages={12}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}