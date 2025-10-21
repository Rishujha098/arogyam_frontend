import {
  LayoutDashboard,
  FileText,
  Activity,
  Calendar,
  Bell,
  Settings,
  User,
  Heart,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Bot,
  FolderHeart,
  ScanText,
  Stethoscope
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Sidebar({ activeTab, onTabChange, isExpanded, setIsExpanded }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', path:'d', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chatbot', path:'chatbot', label: 'AI Chatbot', icon: Bot },
    { id: 'records', path:'records', label: 'Health Records', icon: FolderHeart },
    { id: 'OCR', path:'ocr', label: 'OCR', icon: ScanText },
    { id: 'Scan Analysis', path:'scan', label: 'Scan Analysis', icon: Stethoscope },
    { id: 'consult', path:'consult', label: 'Consultation', icon: Calendar },
    // { id: 'notifications', path:'notifications', label: 'Notifications', icon: Bell },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile',path:'profile', icon: User },
    // { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-gradient-to-b from-blue-600 to-purple-700 text-white transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      } h-screen fixed left-0 top-0 z-40 flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between border-b border-white/20">
        {isExpanded ? (
          <>
            <div className="flex items-center gap-3 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Arogyam</h1>
                <p className="text-xs text-white/80">Healthcare</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {onTabChange(item.id); navigate(item.path) }}
              className={`w-full flex items-center ${isExpanded ? 'gap-3' : 'justify-center'} cursor-pointer px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'hover:bg-white/10 text-white'
              }`}
              title={!isExpanded ? item.label : ''}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'} flex-shrink-0`} />
              {isExpanded && (
                <span className="font-medium transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              )}
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-white/20">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {onTabChange(item.id); navigate(item.path)}}
              className={`w-full cursor-pointer flex items-center ${isExpanded ? 'gap-3' : 'justify-center'} px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group`}
              title={!isExpanded ? item.label : ''}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
              {isExpanded && (
                <span className="font-medium transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
        <button 
          onClick={() => navigate('/')}
          className={`w-full flex items-center ${isExpanded ? 'gap-3' : 'justify-center'} px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-200 group text-red-200`}
          title={!isExpanded ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
          {isExpanded && (
            <span className="font-medium transition-opacity duration-300 whitespace-nowrap">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
