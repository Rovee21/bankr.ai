import { useState, useEffect } from 'react';
import { getPersonalInfo, updatePersonalInfo, PersonalInfo as PersonalInfoType } from '../services/api';

interface Entry {
  field: string;
  value: string;
}

export const PersonalInfo = () => {
  const [selectedField, setSelectedField] = useState('first_name');
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [apiData, setApiData] = useState<PersonalInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<{success: boolean, message: string} | null>(null);

  // Fetch personal info when component mounts
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPersonalInfo();
        setApiData(data);
        
        // Convert API data to entries format
        const newEntries = Object.entries(data)
          .filter(([key]) => key !== 'user_name' && key !== 'credit_score') // Exclude user_name and credit_score
          .map(([key, value]) => ({
            field: key,
            value: value?.toString() || '',
          }));
        
        setEntries(newEntries);
      } catch (err) {
        console.error('Error fetching personal info:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load personal information';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  const personalFields = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'email', label: 'Email Address' },
    { value: 'phone_number', label: 'Phone Number' },
    { value: 'address', label: 'Address' },
    { value: 'date_of_birth', label: 'Date of Birth' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setUpdateStatus(null);

    try {
      // Update on API
      await updatePersonalInfo(selectedField, inputValue);

      // Update local state
      const existingEntryIndex = entries.findIndex(entry => entry.field === selectedField);
      
      if (existingEntryIndex >= 0) {
        setEntries(prev => prev.map((entry, index) => 
          index === existingEntryIndex ? { ...entry, value: inputValue } : entry
        ));
      } else {
        setEntries(prev => [...prev, { field: selectedField, value: inputValue }]);
      }
      
      setUpdateStatus({
        success: true,
        message: `Successfully updated ${selectedField}`
      });
    } catch (err) {
      console.error('Error updating personal info:', err);
      setUpdateStatus({
        success: false,
        message: err instanceof Error ? err.message : 'Failed to update information'
      });
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  const getFieldIcon = (fieldValue: string) => {
    switch(fieldValue) {
      case 'first_name':
      case 'last_name':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone_number':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'address':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'date_of_birth':
        return (
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getFieldLabel = (fieldValue: string): string => {
    const field = personalFields.find(f => f.value === fieldValue);
    return field ? field.label : fieldValue;
  };

  if (loading && !apiData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error && !apiData) {
    return (
      <div className="text-center p-8 bg-red-900/20 border border-red-700/50 rounded-lg">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl text-red-400 font-bold mb-2">Error Loading Data</h3>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-accent mb-2">Personal Information</h2>
        <p className="text-gray-300 text-lg">
          Enter your personal details below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-primary-light p-8 rounded-xl border border-primary-dark shadow-neu-up">
          <div className="relative mb-4">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full bg-primary border border-primary-dark text-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent appearance-none"
              disabled={loading}
            >
              {personalFields.map((field) => (
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
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your information"
                className="w-full bg-primary border border-primary-dark text-white rounded-lg px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-accent hover:bg-accent-light text-primary font-medium rounded-lg transition-colors duration-300 flex items-center"
              disabled={loading || !inputValue.trim()}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {updateStatus && (
        <div className={`p-4 rounded-lg ${updateStatus.success ? 'bg-green-900/20 border border-green-700/50' : 'bg-red-900/20 border border-red-700/50'}`}>
          <div className="flex items-center">
            {updateStatus.success ? (
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <p className={updateStatus.success ? 'text-green-400' : 'text-red-400'}>
              {updateStatus.message}
            </p>
          </div>
        </div>
      )}

      {entries.length > 0 && (
        <div className="relative">
          {/* Glowing effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-accent-dark/30 opacity-70 blur rounded-xl"></div>
          
          <div className="relative bg-primary-light rounded-xl p-8 border border-primary-dark shadow-lg">
            <h3 className="text-xl font-semibold text-accent mb-5">Current Information</h3>
            <div className="space-y-4 divide-y divide-primary-dark">
              {entries.map((entry) => (
                <div key={entry.field} className="flex items-center gap-4 py-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    {getFieldIcon(entry.field)}
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">{getFieldLabel(entry.field)}</span>
                    <p className="font-medium text-white">{entry.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 