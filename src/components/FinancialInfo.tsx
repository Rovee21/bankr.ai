import { useState, useEffect } from 'react';

interface FinancialInfoData {
  yearlySalary: string;
  creditScore: string;
}

interface FinancialInfoProps {
  data: FinancialInfoData;
  onChange: (data: FinancialInfoData) => void;
}

export const FinancialInfo: React.FC<FinancialInfoProps> = ({ data, onChange }) => {
  const [formData, setFormData] = useState<FinancialInfoData>(data);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Financial Information</h2>
        <p className="mt-2 text-lg text-gray-600">
          Please provide your financial details to help us assess your banking needs
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label htmlFor="yearlySalary" className="block text-sm font-medium text-gray-700 mb-1">
            Yearly Salary
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="yearlySalary"
              name="yearlySalary"
              value={formData.yearlySalary}
              onChange={handleChange}
              className="pl-7 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700 mb-1">
            Credit Score
          </label>
          <div className="relative">
            <input
              type="number"
              id="creditScore"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              min="300"
              max="850"
              required
            />
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Credit scores typically range from 300 to 850
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 