import Head from 'next/head';
import Navigation from '../components/Navigation';
import { DocumentUpload } from '../components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>Bankr.ai - Smart Banking Assistant</title>
        <meta name="description" content="Your personal banking assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Welcome to Bankr.ai
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <DocumentUpload onUpload={() => {}} />
          </div>
        </div>
      </main>
    </div>
  );
} 