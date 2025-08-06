import { Search, LayoutGrid, MoreHorizontal, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeaderProps {
  onMenuClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ onMenuClick, searchQuery = '', onSearchChange }: HeaderProps) {
  return (
    <header className="bg-gray-50 border-b border-gray-200">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="p-1" onClick={onMenuClick}>
            <Menu className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
        
        {/* Desktop spacer */}
        <div className="hidden md:block"></div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:hidden">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>
          <LayoutGrid className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src="/images/profile-1.webp" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Wallet Ledger section */}
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center">
            <h1 className="text-lg md:text-4xl font-bold text-gray-900">Wallet Ledger</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-900"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
            <span className="flex items-center gap-1 text-sm bg-gray-100 rounded-full px-2 py-1 ml-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              className="bg-[#437D8E] hover:bg-[#437D8E]/90 rounded-full text-gray-900 font-medium px-3 md:px-4 py-2 text-xs md:text-sm"
            >
              Share
            </Button>
            <div className="border-gray-100 border-2 rounded-2xl p-1.5 md:p-2">
              <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            </div>
          </div>
        </div>

        {/* Profile avatars section */}
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="flex -space-x-1 md:-space-x-2">
            <Avatar className="w-6 h-6 md:w-8 md:h-8 border-2 border-white">
              <AvatarImage src="/images/profile-1.webp" />
              <AvatarFallback className="text-xs">A</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 md:w-8 md:h-8 border-2 border-white">
              <AvatarImage src="/images/profile-2.webp" />
              <AvatarFallback className="text-xs">L</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 md:w-8 md:h-8 border-2 border-white">
              <AvatarImage src="/images/profile-3.webp" />
              <AvatarFallback className="text-xs">N</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 md:w-8 md:h-8 border-2 border-white">
              <AvatarImage src="/images/profile-4.webp" />
              <AvatarFallback className="text-xs">+</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs md:text-sm text-gray-400 ml-1 md:ml-2 hidden sm:block">Ava, Liam, Noah +12 others</span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="px-4 md:px-6">
        <Tabs defaultValue="overview">
          <TabsList className="bg-transparent rounded-none h-auto p-0 w-full justify-start">
            <TabsTrigger 
              value="overview" 
              className="bg-transparent text-gray-900 border-b-2 border-transparent data-[state=active]:border-[#437D8E] data-[state=active]:bg-transparent data-[state=active]:text-[#437D8E] rounded-none px-0 py-3 mr-8 font-medium text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="bg-transparent text-gray-400 border-b-2 border-transparent data-[state=active]:border-[#437D8E] data-[state=active]:bg-transparent data-[state=active]:text-[#437D8E] rounded-none px-0 py-3 font-medium text-sm"
            >
              Transactions
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}