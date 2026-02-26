import { Users, Activity, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="page-wrapper">
            {/* Page Header */}
            <div className="mb-2">
                <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
                <p className="text-sm text-slate-500 mt-1">Welcome to the Citizen Portal Administration.</p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Stat Card 1: Total Citizens */}
                <div className="admin-card flex items-center gap-4 border-l-4 border-l-primary-500">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-medium">Total Citizens</h3>
                        <p className="text-3xl font-bold text-slate-800 mt-1">12,450</p>
                    </div>
                </div>

                {/* Stat Card 2: Active Services */}
                <div className="admin-card flex items-center gap-4 border-l-4 border-l-green-500">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <Activity className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-medium">Active Services</h3>
                        <p className="text-3xl font-bold text-slate-800 mt-1">48</p>
                    </div>
                </div>

                {/* Stat Card 3: Pending Complaints */}
                <div className="admin-card flex items-center gap-4 border-l-4 border-l-red-500">
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-medium">Pending Complaints</h3>
                        <p className="text-3xl font-bold text-slate-800 mt-1">156</p>
                    </div>
                </div>

            </div>
        </div>
    )
}