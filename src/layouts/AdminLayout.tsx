import { Outlet } from 'react-router-dom'
import Sidebar from '../common/components/Sidebar'
import Header from '../common/components/Header'

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Isolated Sidebar Component */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col relative min-w-0">

                {/* Isolated, Memoized Header Component */}
                <Header />

                {/* Dynamic Page Content Injector (This changes based on the route) */}
                <main className="flex-1 overflow-auto bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}