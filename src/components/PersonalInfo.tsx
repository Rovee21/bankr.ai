import { useState } from 'react';

interface Entry {
  field: string;
  value: string;
}

export const PersonalInfo = () => {
  const [selectedField, setSelectedField] = useState('name');
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  const personalFields = [
    { value: 'name', label: 'Full Name' },
    { value: 'email', label: 'Email Address' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'address', label: 'Address' },
    { value: 'dob', label: 'Date of Birth' },
    { value: 'ssn', label: 'Social Security Number' },
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Personal Information</h2>
        <p className="mt-2 text-lg text-gray-600">
          Enter your personal details below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full rounded-lg border-gray-300 mb-4"
          >
            {personalFields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your information"
              className="flex-1 rounded-lg border-gray-300"
            />
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Information</h3>
          <div className="space-y-2">
            {personalFields.map((field) => {
              const entry = entries.find(e => e.field === field.value);
              if (!entry) return null;
              
              return (
                <div key={field.value} className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">{field.label}:</span>
                  <span className="text-gray-600">{entry.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}; 