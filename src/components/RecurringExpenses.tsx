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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Monthly Expenses</h2>
        <p className="mt-2 text-lg text-gray-600">
          Track your recurring monthly expenses
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full rounded-lg border-gray-300 mb-4"
          >
            {expenseFields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                step="0.01"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0.00"
                className="pl-7 block w-full rounded-lg border-gray-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {entries.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Expenses</h3>
          <div className="space-y-2">
            {expenseFields.map((field) => {
              const entry = entries.find(e => e.field === field.value);
              if (!entry) return null;
              
              return (
                <div key={field.value} className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">{field.label}:</span>
                  <span className="text-gray-600">{formatCurrency(entry.value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}; 