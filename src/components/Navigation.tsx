import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();

  const tabs = [
    { id: 'documents', label: 'Documents', path: '/' },
    { id: 'personal', label: 'Personal Info', path: '/personal' },
    { id: 'financial', label: 'Financial Info', path: '/financial' },
    { id: 'expenses', label: 'Expenses', path: '/expenses' },
  ];

  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bankr.ai
              </span>
            </Link>
          </div>
          
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
                  ${router.pathname === tab.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 