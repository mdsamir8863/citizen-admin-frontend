import { useState } from 'react'
import { User, Mail, ShieldCheck, KeyRound, Save } from 'lucide-react'
import { useAppSelector } from '../../../app/hooks'

export default function AdminProfile() {
    const { user } = useAppSelector((state) => state.auth)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault()
        // Future: API call to change password
        alert('Password change requested successfully.')
        setCurrentPassword('')
        setNewPassword('')
    }

    return (
        <div className="page-wrapper max-w-5xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your administrative account settings and security.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Identity Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="admin-card text-center border-t-4 border-t-primary-500">
                        <div className="w-24 h-24 mx-auto bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-4xl mb-4 border-4 border-white shadow-lg">
                            {user?.adminRole ? user.adminRole.charAt(0) : 'A'}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{user?.adminRole || 'Administrator'}</h3>
                        <p className="text-sm text-slate-500 flex items-center justify-center gap-2 mt-2">
                            <ShieldCheck className="w-4 h-4 text-green-500" /> Authorized Personnel
                        </p>
                    </div>

                    <div className="admin-card !p-5">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Account Details</h4>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-slate-500 mb-1 flex items-center gap-2"><User className="w-4 h-4" /> Admin ID</p>
                                <p className="font-bold text-slate-800">{user?.adminId || 'ADM-PENDING'}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 mb-1 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</p>
                                <p className="font-bold text-slate-800">{user?.email || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Security */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Personal Info Form (Mocked as disabled for now, admins usually can't change their own assigned email easily) */}
                    <div className="admin-card">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="input-label">Full Name</label>
                                <input type="text" className="input-field" defaultValue="Super Administrator" disabled />
                                <p className="text-xs text-slate-400 mt-1">Contact IT to change your legal name.</p>
                            </div>
                            <div>
                                <label className="input-label">Department</label>
                                <input type="text" className="input-field" defaultValue="Central Citizen Services" disabled />
                            </div>
                        </div>
                    </div>

                    {/* Change Password Form */}
                    <div className="admin-card border border-red-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <KeyRound className="w-5 h-5 text-slate-500" /> Security & Password
                        </h3>
                        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                            <div>
                                <label className="input-label">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="input-field !pl-3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="input-field !pl-3"
                                    required
                                    minLength={8}
                                />
                                <p className="text-xs text-slate-500 mt-2">Must be at least 8 characters long.</p>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="btn-primary">
                                    <Save className="w-4 h-4" /> Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}