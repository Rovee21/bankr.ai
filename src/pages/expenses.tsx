import Head from 'next/head';
import Navigation from '../components/Navigation';
import { RecurringExpenses } from '../components/RecurringExpenses';

export default function ExpensesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark to-primary">
      <Head>
        <title>Recurring Expenses - Bankr.ai</title>
        <meta name="description" content="Your personal banking assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Glowing effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent-light/20 opacity-30 blur-xl rounded-2xl"></div>
            
            {/* Main card */}
            <div className="relative bg-primary-light rounded-2xl shadow-xl border border-accent/20 p-8">
              <RecurringExpenses />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 