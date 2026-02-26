import { useNavigate } from 'react-router-dom'
import { AlertOctagon, ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md admin-card border-t-4 border-t-primary-500 shadow-lg">

                {/* Visual Icon Header */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary-50 rounded-full animate-pulse">
                        <AlertOctagon className="w-16 h-16 text-primary-500" />
                    </div>
                </div>

                {/* Error Messaging */}
                <h1 className="text-7xl font-extrabold text-slate-800 mb-2">404</h1>
                <h2 className="text-2xl font-semibold text-slate-700 mb-3">Page Not Found</h2>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    The portal page you are looking for does not exist, has been moved, or you might not have the correct administrative privileges to view it.
                </p>

                {/* Recovery Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate(-1)} // Navigates to the previous history state
                        className="btn-secondary w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')} // Forces navigation to the safe root dashboard
                        className="btn-primary w-full sm:w-auto"
                    >
                        <Home className="w-4 h-4" /> Back to Dashboard
                    </button>
                </div>

            </div>
        </div>
    )
}