import { useState } from 'react'
import { Settings, Shield, Key, FileText, ToggleLeft, Save } from 'lucide-react'

// Define our setting tabs
type TabType = 'GENERAL' | 'SECURITY' | 'API_KEYS' | 'AUDIT'

export default function SystemSettings() {
    const [activeTab, setActiveTab] = useState<TabType>('GENERAL')

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        alert('System configuration updated successfully.')
    }

    return (
        <div className="page-wrapper max-w-6xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Manage global platform configurations and security policies.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Left Side: Vertical Navigation Tabs */}
                <div className="w-full md:w-64 flex flex-col gap-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                    <button
                        onClick={() => setActiveTab('GENERAL')}
                        className={`flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'GENERAL' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Settings className="w-4 h-4" /> Global Config
                    </button>
                    <button
                        onClick={() => setActiveTab('SECURITY')}
                        className={`flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'SECURITY' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Shield className="w-4 h-4" /> Security & Access
                    </button>
                    <button
                        onClick={() => setActiveTab('API_KEYS')}
                        className={`flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'API_KEYS' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Key className="w-4 h-4" /> Integrations & APIs
                    </button>
                    <button
                        onClick={() => setActiveTab('AUDIT')}
                        className={`flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'AUDIT' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <FileText className="w-4 h-4" /> System Audit Logs
                    </button>
                </div>

                {/* Right Side: Tab Content Area */}
                <div className="flex-1 w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">

                    {/* GENERAL TAB CONTENT */}
                    {activeTab === 'GENERAL' && (
                        <div className="animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Global Configuration</h3>
                            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">

                                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                                    <div>
                                        <h4 className="font-bold text-slate-800 flex items-center gap-2">Maintenance Mode</h4>
                                        <p className="text-sm text-slate-500 mt-1">Turn off citizen access to the public portal.</p>
                                    </div>
                                    <ToggleLeft className="w-10 h-10 text-slate-300 cursor-pointer hover:text-orange-400 transition-colors" />
                                </div>

                                <div>
                                    <label className="input-label">Official Support Email</label>
                                    <input type="email" className="input-field" defaultValue="support@citizen.gov" />
                                </div>

                                <div>
                                    <label className="input-label">Toll-Free Helpline Number</label>
                                    <input type="text" className="input-field" defaultValue="1800-123-4567" />
                                </div>

                                <button type="submit" className="btn-primary mt-4">
                                    <Save className="w-4 h-4" /> Save Configuration
                                </button>
                            </form>
                        </div>
                    )}

                    {/* SECURITY TAB CONTENT */}
                    {activeTab === 'SECURITY' && (
                        <div className="animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Security Policies</h3>
                            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                                <div>
                                    <label className="input-label">Admin Session Timeout (Minutes)</label>
                                    <input type="number" className="input-field max-w-xs" defaultValue="15" />
                                    <p className="text-xs text-slate-500 mt-1">Automatically log out inactive admins.</p>
                                </div>
                                <div>
                                    <label className="input-label">Whitelisted Office IPs (Comma separated)</label>
                                    <textarea className="input-field h-24" defaultValue="192.168.1.1, 10.0.0.5" />
                                </div>
                                <button type="submit" className="btn-primary mt-4">
                                    <Save className="w-4 h-4" /> Update Security Policies
                                </button>
                            </form>
                        </div>
                    )}

                    {/* AUDIT TAB CONTENT (Read Only) */}
                    {activeTab === 'AUDIT' && (
                        <div className="animate-in fade-in duration-300">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">System Audit Logs</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                                    <span className="font-bold text-primary-600">[SUPER_ADMIN]</span> admin@citizen.gov accessed System Settings.
                                    <span className="block text-xs text-slate-400 mt-1">Today at 11:45 AM | IP: 192.168.1.12</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                                    <span className="font-bold text-slate-700">[SUPPORT_ADMIN]</span> rahul.s@citizen.gov resolved Complaint ID CMP-1029.
                                    <span className="block text-xs text-slate-400 mt-1">Today at 10:30 AM | IP: 10.0.0.24</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                                    <span className="font-bold text-red-600">[SYSTEM]</span> Failed login attempt for admin@citizen.gov.
                                    <span className="block text-xs text-slate-400 mt-1">Yesterday at 09:15 PM | IP: 45.33.22.11</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* API_KEYS TAB CONTENT */}
                    {activeTab === 'API_KEYS' && (
                        <div className="animate-in fade-in duration-300 text-center py-12">
                            <Key className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-800">API Gateway Integration</h3>
                            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
                                SMS and Email SMTP credentials will be managed here once the Node.js backend integration is complete.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}