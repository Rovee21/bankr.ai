import { useState, useEffect } from 'react';
import { updatePersonalInfo, getPersonalInfo } from '../services/api';

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
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<{success: boolean, message: string} | null>(null);
  const [currentCreditScore, setCurrentCreditScore] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current credit score from API when component mounts
  useEffect(() => {
    const fetchCreditScore = async () => {
      setIsLoading(true);
      try {
        const personalData = await getPersonalInfo();
        if (personalData.credit_score) {
          setCurrentCreditScore(personalData.credit_score.toString());
          // Update the form with current data
          setFormData(prev => ({
            ...prev,
            creditScore: personalData.credit_score.toString()
          }));
        }
      } catch (err) {
        console.error("Failed to load credit score:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreditScore();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUpdateStatus(null);
    
    try {
      // Update credit score on API
      if (formData.creditScore) {
        await updatePersonalInfo('credit_score', formData.creditScore);
        setCurrentCreditScore(formData.creditScore); // Update the displayed current value
      }
      
      // Yearly salary would be updated similarly if API supports it
      
      setUpdateStatus({
        success: true,
        message: 'Successfully updated financial information'
      });
    } catch (err) {
      console.error('Error updating financial info:', err);
      setUpdateStatus({
        success: false,
        message: err instanceof Error ? err.message : 'Failed to update information'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-accent mb-2">Financial Information</h2>
        <p className="text-gray-300 text-lg">
          Please provide your financial details to help us assess your banking needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary-light p-8 rounded-xl border border-primary-dark shadow-neu-up">
          <label htmlFor="yearlySalary" className="block text-sm font-medium text-accent mb-2">
            Yearly Salary
          </label>
          <div className="relative rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-accent sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="yearlySalary"
              name="yearlySalary"
              value={formData.yearlySalary}
              onChange={handleChange}
              className="pl-7 block w-full bg-primary border border-primary-dark text-white rounded-lg px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-200"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="bg-primary-light p-8 rounded-xl border border-primary-dark shadow-neu-up">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="creditScore" className="block text-sm font-medium text-accent">
              Credit Score
            </label>
            {currentCreditScore && !isLoading && (
              <div className="text-sm text-accent">
                Current: <span className="font-semibold">{currentCreditScore}</span>
              </div>
            )}
            {isLoading && (
              <div className="text-sm text-gray-400">
                Loading...
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              id="creditScore"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              className="block w-full bg-primary border border-primary-dark text-white rounded-lg px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-200"
              min="300"
              max="850"
              required
            />
            <div className="mt-3 flex items-center text-sm text-gray-400">
              <svg className="h-4 w-4 mr-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Credit scores typically range from 300 to 850
            </div>
          </div>
        </div>
        
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
        
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full px-5 py-3 bg-accent hover:bg-accent-light text-primary font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Save Financial Information
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 