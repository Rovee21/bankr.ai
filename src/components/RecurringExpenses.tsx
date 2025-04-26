import { useState } from 'react';

interface Entry {
  field: string;
  value: string;
}

export const RecurringExpenses = () => {
  const [selectedField, setSelectedField] = useState('rent');
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  const expenseFields = [
    { value: 'rent', label: 'Rent/Mortgage' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'phone', label: 'Phone/Internet' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other Expenses' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const existingEntryIndex = entries.findIndex(entry => entry.field === selectedField);
    
    if (existingEntryIndex >= 0) {
      setEntries(prev => prev.map((entry, index) => 
        index === existingEntryIndex ? { ...entry, value: inputValue } : entry
      ));
    } else {
      setEntries(prev => [...prev, { field: selectedField, value: inputValue }]);
    }
    
    setInputValue('');
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  };

  const getFieldIcon = (fieldValue: string) => {
    switch(fieldValue) {
      case 'rent':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'utilities':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'groceries':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'transportation':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'insurance':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'entertainment':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        );
      case 'other':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-accent mb-2">Monthly Expenses</h2>
        <p className="text-gray-300 text-lg">
          Track your recurring monthly expenses
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-primary-light p-8 rounded-xl border border-primary-dark shadow-neu-up">
          <div className="relative mb-4">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full bg-primary border border-primary-dark text-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent appearance-none"
            >
              {expenseFields.map((field) => (
                <option key={field.value} value={field.value} className="bg-primary-light">
                  {field.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {getFieldIcon(selectedField)}
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-accent sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0.00"
                className="pl-7 block w-full bg-primary border border-primary-dark text-white rounded-lg px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-accent hover:bg-accent-light text-primary font-medium rounded-lg transition-colors duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </form>

      {entries.length > 0 && (
        <div className="relative">
          {/* Glowing effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-accent-dark/30 opacity-70 blur rounded-xl"></div>
          
          <div className="relative bg-primary-light rounded-xl p-8 border border-primary-dark shadow-lg">
            <h3 className="text-xl font-semibold text-accent mb-5">Current Expenses</h3>
            <div className="space-y-4 divide-y divide-primary-dark">
              {expenseFields.map((field) => {
                const entry = entries.find(e => e.field === field.value);
                if (!entry) return null;
                
                return (
                  <div key={field.value} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        {getFieldIcon(field.value)}
                      </div>
                      <span className="font-medium text-white">{field.label}</span>
                    </div>
                    <span className="text-accent font-semibold">{formatCurrency(entry.value)}</span>
                  </div>
                );
              })}
              
              {entries.length > 1 && (
                <div className="flex justify-between items-center py-4">
                  <span className="font-bold text-white text-lg">Total</span>
                  <span className="text-accent font-bold text-lg">
                    {formatCurrency(
                      entries.reduce((sum, entry) => sum + parseFloat(entry.value || '0'), 0).toString()
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 