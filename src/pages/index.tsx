import Head from 'next/head';
import Navigation from '../components/Navigation';
import { DocumentUpload } from '../components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark to-primary">
      <Head>
        <title>Bankr.ai - Smart Banking Assistant</title>
        <meta name="description" content="Your personal banking assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="text-accent">Smart</span> Banking Assistant
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Upload your financial documents and let our AI analyze them for you
            </p>
          </div>
          
          <div className="relative">
            {/* Glowing effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-light opacity-30 blur-xl rounded-2xl"></div>
            
            {/* Main card */}
            <div className="relative bg-primary-light rounded-2xl shadow-xl border border-accent/20 p-8">
              <DocumentUpload onUpload={() => {}} />
            </div>
          </div>
          
          {/* Features section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-primary-light rounded-xl border border-primary-dark">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">Secure</h3>
              <p className="text-gray-300">Your financial data is always encrypted and protected</p>
            </div>
            <div className="p-6 bg-primary-light rounded-xl border border-primary-dark">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">Fast</h3>
              <p className="text-gray-300">Get insights from your documents in seconds</p>
            </div>
            <div className="p-6 bg-primary-light rounded-xl border border-primary-dark">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">Smart</h3>
              <p className="text-gray-300">AI-powered analysis to help you make better financial decisions</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 