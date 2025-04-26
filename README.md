# Bankr.ai - Smart Banking Assistant

A modern banking application that helps users manage their financial information and documents.

## Features

- Document upload with drag-and-drop support
- Personal information collection
- Financial information tracking
- Recurring expenses management
- Multi-step form with progress tracking

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bankr.ai.git
cd bankr.ai
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
src/
├── components/         # React components
│   ├── DocumentUpload.tsx
│   ├── PersonalInfo.tsx
│   ├── FinancialInfo.tsx
│   └── RecurringExpenses.tsx
├── pages/             # Next.js pages
│   └── index.tsx      # Main application page
└── types/             # TypeScript type definitions
```

## Technologies Used

- Next.js
- React
- TypeScript
- TailwindCSS
- React Dropzone

## License

MIT
