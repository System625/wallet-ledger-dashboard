'use client';

import { useState } from 'react';
import { Menu, LayoutDashboard, ArrowRightLeft, FileText, Settings } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ArrowRightLeft, label: 'Transactions', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar({ className, isOpen = false, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={cn(
          "bg-gray-50 h-screen flex flex-col z-50 transition-transform duration-300 ease-in-out md:transition-all",
          // Mobile
          "fixed top-0 left-0 w-64 transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop
          "md:relative md:translate-x-0",
          isCollapsed ? "md:w-16" : "md:w-64",
          className
        )}
      >
      {/* Header with toggle button */}
      <div className="p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/logo.webp"
                  alt="FinTrack Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="relative top-2 text-2xl font-medium text-[#437D8E]" style={{ fontFamily: 'var(--font-timmana)' }}>FinTrack</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    item.active
                      ? "bg-[#437D8E]/10 text-[#437D8E] font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    isCollapsed ? "justify-center px-2" : ""
                  )}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
    </>
  );
}