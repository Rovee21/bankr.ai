import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'documents', label: 'Documents', path: '/' },
    { id: 'personal', label: 'Personal Info', path: '/personal' },
    { id: 'financial', label: 'Financial Info', path: '/financial' },
    { id: 'expenses', label: 'Expenses', path: '/expenses' },
  ];

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-lg">B</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  <span className="text-accent">Bankr</span>.ai
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                    ${router.pathname === tab.path
                      ? 'bg-primary-light text-accent border-b-2 border-accent'
                      : 'text-gray-300 hover:bg-primary-light hover:text-white'
                    }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-primary-light focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-primary-light`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === tab.path
                  ? 'bg-primary-dark text-accent'
                  : 'text-gray-300 hover:bg-primary-dark hover:text-accent'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 