import { useState } from 'react';
import { Sidebar } from './Sidebar';
import TopBar  from './Topbar';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <TopBar isExpanded={isExpanded} />

      <main className={`transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'} pt-20 p-8`}>
        <Outlet/>
      </main>
    </div>
  );
}
