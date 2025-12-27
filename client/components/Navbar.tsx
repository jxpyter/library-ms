"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, User, Armchair, Coffee } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === '/') return null; // Don't show on login page

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Books', href: '/books', icon: BookOpen },
    { name: 'Desks', href: '/desks', icon: Armchair },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        LibrarySys
      </div>
      <div className="flex gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center gap-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
