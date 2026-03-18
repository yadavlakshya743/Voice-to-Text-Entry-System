# Voice-to-Text Entry System 🎙️

A modern, highly-responsive web application that allows users to seamlessly capture voice notes in real-time and generate intelligent summaries using AI. Built with a beautiful glassmorphism UI, this tool prioritizes user experience and aesthetic design.

## Features ✨

- **Real-Time Voice-to-Text**: Utilizes the browser's native Web Speech API to provide immediate and accurate text transcriptions of your speech.
- **AI Summarization**: Integrates with Google's Gemini API to condense long recordings or notes into sharp, actionable summaries.
- **Modern Glassmorphism Design**: Custom Vanilla CSS featuring beautiful gradients, blur effects, pulsating recording indicators, and responsive layouts.
- **Rich Text Editing**: Easily modify transcribed text before requesting a summary.

## Tech Stack 🛠️

- **Frontend**: React, Vite, Vanilla CSS, Lucide React (for icons)
- **Backend**: Node.js, Express, dotenv, CORS, `@google/generative-ai`

---

## Getting Started 🚀

### Prerequisites

- Node.js installed on your machine.
- A modern browser that supports the Web Speech API (like Google Chrome or Microsoft Edge).
- A valid Gemini API key.

### 1. Backend Setup

1. **Navigate to the Backend**:
   ```bash
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Open `.env` (or create one if it doesn't exist) in the `backend` folder and add your Gemini API Key:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Start the Server**:
   ```bash
   node index.js
   ```
   *The backend should now run on `http://localhost:5000`.*

### 2. Frontend Setup

1. **Navigate to the Frontend**:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## Usage 💡

1. Open `http://localhost:5173` in your browser.
2. Click **Start Recording** and grant microphone permissions if prompted.
3. Speak your thoughts and watch the text appear in the editor.
4. Stop the recording. Edit the note manually if needed.
5. Click **Summarize Note** to generate a concise summary via the Gemini AI backend. 

---
*Created as part of an Advanced Agentic Coding task.*