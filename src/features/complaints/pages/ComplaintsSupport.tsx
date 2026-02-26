import { useState } from 'react'
import { Send, User, Clock, FileText, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react'

// 1. Strict TypeScript Interfaces for Contextual Data Aggregation
interface ContextUser {
    userId: string
    name: string
    email: string
    phone: string
    accountAge: string
}

interface ContextService {
    serviceId: string
    serviceName: string
    status: string
}

interface Message {
    id: string
    sender: 'USER' | 'ADMIN'
    text: string
    timestamp: string
}

interface ComplaintTicket {
    id: string
    title: string
    status: 'OPEN' | 'RESOLVED' | 'ESCALATED'
    messages: Message[]
    context: {
        user: ContextUser
        relatedService: ContextService
    }
}

// 2. Mock Data: API Response bundling Chat + User Context
const MOCK_TICKET: ComplaintTicket = {
    id: 'CMP-1029',
    title: 'Delay in Passport Renewal Verification',
    status: 'OPEN',
    messages: [
        { id: 'm1', sender: 'USER', text: 'Hello, I applied for my passport renewal 3 weeks ago but the status is still stuck on pending. Can you please check?', timestamp: '10:30 AM' },
        { id: 'm2', sender: 'ADMIN', text: 'Dear Citizen, let me pull up your service record right away. Please give me a moment.', timestamp: '10:35 AM' },
        { id: 'm3', sender: 'USER', text: 'Thank you, I have an upcoming flight next month so it is quite urgent.', timestamp: '10:38 AM' }
    ],
    context: {
        user: {
            userId: 'USR-445',
            name: 'Rahul Kumar',
            email: 'rahul.k@example.com',
            phone: '+91-9876543210',
            accountAge: '2 years, 4 months'
        },
        relatedService: {
            serviceId: 'SRV-99',
            serviceName: 'Passport Renewal (Tatkal)',
            status: 'Pending Police Verification'
        }
    }
}

export default function ComplaintsSupport() {
    const [replyText, setReplyText] = useState('')
    const [ticket] = useState<ComplaintTicket>(MOCK_TICKET) // In reality, fetched via RTK Query

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault()
        if (!replyText.trim()) return
        // Future: Dispatch RTK Query mutation to save reply
        alert(`Reply sent: ${replyText}`)
        setReplyText('')
    }

    return (
        // Full height container subtracting the header height (h-16 = 4rem)
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-slate-50">

            {/* LEFT PANE (60%): Chat Interface */}
            <div className="flex-1 flex flex-col border-r border-slate-200 bg-white">

                {/* Chat Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm z-10">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            {ticket.title}
                            <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full border border-yellow-200">
                                {ticket.status}
                            </span>
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">Ticket ID: {ticket.id}</p>
                    </div>
                    <button className="btn-secondary !py-1.5 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" /> Mark Resolved
                    </button>
                </div>

                {/* Chat Messages Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                    {ticket.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender === 'ADMIN'
                                    ? 'bg-primary-500 text-white rounded-tr-none'
                                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                                }`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className={`text-xs mt-2 text-right ${msg.sender === 'ADMIN' ? 'text-primary-100' : 'text-slate-400'}`}>
                                    {msg.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <form onSubmit={handleSendReply} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your official response..."
                            className="input-field flex-1 !pl-4"
                        />
                        <button type="submit" className="btn-primary !px-6">
                            Send <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT PANE (40%): Contextual User Sidebar */}
            <div className="w-full lg:w-96 bg-slate-50 flex flex-col overflow-y-auto">
                <div className="p-6 space-y-6">

                    {/* Section 1: User Profile Context */}
                    <div className="admin-card border-t-4 border-t-primary-500">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" /> Citizen Profile
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-xl">
                                {ticket.context.user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{ticket.context.user.name}</h4>
                                <p className="text-xs text-slate-500">ID: {ticket.context.user.userId}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-500 flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</span>
                                <span className="font-medium text-slate-800">{ticket.context.user.phone}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-500 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</span>
                                <span className="font-medium text-slate-800 truncate max-w-[120px]" title={ticket.context.user.email}>
                                    {ticket.context.user.email}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pb-1">
                                <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Account Age</span>
                                <span className="font-medium text-slate-800">{ticket.context.user.accountAge}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Related Service Context */}
                    <div className="admin-card">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Related Service
                        </h3>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800 text-sm mb-1">{ticket.context.relatedService.serviceName}</p>
                            <p className="text-xs text-slate-500 mb-3">Service ID: {ticket.context.relatedService.serviceId}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Current Status:</span>
                                <span className="px-2 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-md border border-orange-200">
                                    {ticket.context.relatedService.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Admin Quick Actions */}
                    <div className="space-y-3">
                        <button className="btn-secondary w-full text-slate-700 border-slate-300 shadow-sm">
                            View Full Service History
                        </button>
                        <button className="btn-danger w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 shadow-sm">
                            <AlertTriangle className="w-4 h-4" /> Escalate to Super Admin
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}