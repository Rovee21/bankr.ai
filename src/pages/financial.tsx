import Head from 'next/head';
import Navigation from '../components/Navigation';
import { FinancialInfo } from '../components/FinancialInfo';

export default function FinancialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Financial Information - Bankr.ai</title>
        <meta name="description" content="Your personal banking assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <FinancialInfo
              data={{
                yearlySalary: '',
                creditScore: '',
              }}
              onChange={() => {}}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 