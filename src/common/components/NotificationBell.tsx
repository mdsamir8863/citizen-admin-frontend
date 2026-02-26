import { useState, useRef, useEffect } from 'react'
import { Bell, Check, Trash2, User, FileText, AlertTriangle, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// 1. Strict Types for Notifications
type NotificationType = 'USER_SIGNUP' | 'SERVICE_REQUEST' | 'COMPLAINT' | 'SYSTEM_ALERT'

interface AppNotification {
    id: string
    type: NotificationType
    title: string
    message: string
    time: string
    isRead: boolean
    linkTo: string // Where the admin should be redirected when they click it
}

// 2. Mock Data (This will be replaced by Socket.io + RTK Query later)
const MOCK_NOTIFICATIONS: AppNotification[] = [
    {
        id: 'notif-1',
        type: 'SYSTEM_ALERT',
        title: 'High Server CPU Usage',
        message: 'The main database is experiencing high load.',
        time: '2 mins ago',
        isRead: false,
        linkTo: '/settings'
    },
    {
        id: 'notif-2',
        type: 'SERVICE_REQUEST',
        title: 'New Passport Application',
        message: 'Rahul Kumar submitted a new Tatkal request.',
        time: '15 mins ago',
        isRead: false,
        linkTo: '/services'
    },
    {
        id: 'notif-3',
        type: 'COMPLAINT',
        title: 'Complaint Escalated',
        message: 'Ticket #CMP-1029 has been escalated to Super Admin.',
        time: '1 hour ago',
        isRead: false,
        linkTo: '/complaints'
    },
    {
        id: 'notif-4',
        type: 'USER_SIGNUP',
        title: 'New Citizen Registered',
        message: 'Priya Sharma verified her account.',
        time: '3 hours ago',
        isRead: true,
        linkTo: '/users'
    }
]

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const unreadCount = notifications.filter(n => !n.isRead).length

    // Handle clicking outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    }

    const handleClearAll = () => {
        setNotifications([])
    }

    const handleNotificationClick = (notif: AppNotification) => {
        // Mark as read
        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n))
        setIsOpen(false)
        // Navigate to the relevant module
        navigate(notif.linkTo)
    }

    // Helper function to render the correct icon and color based on notification type
    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case 'USER_SIGNUP': return <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><User className="w-4 h-4" /></div>
            case 'SERVICE_REQUEST': return <div className="p-2 bg-green-50 text-green-600 rounded-full"><FileText className="w-4 h-4" /></div>
            case 'COMPLAINT': return <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><MessageSquare className="w-4 h-4" /></div>
            case 'SYSTEM_ALERT': return <div className="p-2 bg-red-50 text-red-600 rounded-full"><AlertTriangle className="w-4 h-4" /></div>
            default: return <div className="p-2 bg-slate-50 text-slate-600 rounded-full"><Bell className="w-4 h-4" /></div>
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* The Bell Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors cursor-pointer"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
            </button>

            {/* The Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* Panel Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Notifications <span className="text-primary-600 ml-1">({unreadCount})</span></h3>
                        <div className="flex items-center gap-2">
                            <button onClick={handleMarkAllRead} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors" title="Mark all as read">
                                <Check className="w-4 h-4" />
                            </button>
                            <button onClick={handleClearAll} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Clear all">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Panel Body (Scrollable List) */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                                <p className="text-sm">You are all caught up!</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`p-4 flex gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${!notif.isRead ? 'bg-primary-50/30' : ''}`}
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(notif.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className={`text-sm truncate pr-2 ${!notif.isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                                                    {notif.title}
                                                </p>
                                                <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-2">{notif.message}</p>
                                        </div>

                                        {/* Unread Dot Indicator */}
                                        {!notif.isRead && (
                                            <div className="flex-shrink-0 flex items-center">
                                                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel Footer */}
                    <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                        <button className="text-xs font-bold text-primary-600 hover:underline">
                            View All Activity
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}