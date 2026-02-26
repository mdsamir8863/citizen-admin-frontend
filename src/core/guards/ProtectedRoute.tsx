import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

export default function ProtectedRoute() {
    // 1. Extract authentication state directly from Redux Memory
    const { isAuthenticated, accessToken, user } = useAppSelector((state) => state.auth)
    const location = useLocation()

    // 2. If there is no token or the user is not authenticated, kick them to login
    if (!isAuthenticated || !accessToken || !user) {
        // We pass the 'location' in state so we can redirect them back to their 
        // intended page after a successful login (a standard enterprise UX practice).
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Optional Future Feature: RBAC Role Evaluation can happen here before returning Outlet
    // e.g., if (user.adminRole !== 'Super Admin') return <Navigate to="/unauthorized" />

    // 3. If authenticated, render the child routes (Admin Layout)
    return <Outlet />
}