# Smart Construction Estimator

An AI-powered construction bidding application designed to analyze blueprints, extract critical project variables, and generate a formal proposal with a modern, high-end corporate layout.

## 🚀 Features

- **AI Blueprint Analysis**: Integrated with Google Gemini 2.0 Pro for neural extraction of project data from PDF blueprints.
- **Dynamic Bid Recalculation**: Interactive "Neural Results Hub" allows estimators to audit and adjust extracted quantities in real-time.
- **Proposal Generation**: Automated HTML/CSS template generator producing elegant, professional-grade bidding documents.
- **Intelligence Engine Selection**: Support for multiple AI providers (Gemini, Claude, GPT) to assist in modeling.

## 🛠 Tech Stack

- **Frontend**: React 19, Vite 8.
- **AI**: Google Generative AI (@google/generative-ai).
- **Styling**: Vanilla CSS with modern patterns (Flexbox, Grid, Glassmorphism).

## 📥 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google AI (Gemini) API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/escovadecabelo/Smart_construction_estimator.git
   cd Smart_construction_estimator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📄 Usage

1. **Dashboard**: Select the construction scope (Cleaning, Demolition, or Painting).
2. **Analysis**: Upload a PDF blueprint. The AI will read the schedules and Identify quantities.
3. **Audit**: Review the extracted variables in the Neural Results Hub. Edit quantities as needed.
4. **Proposal**: Generate a formal PDF-ready proposal with a single click.

## 📜 License

ISC
