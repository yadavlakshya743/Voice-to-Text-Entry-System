import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Wand2, RefreshCw, CheckCircle2 } from 'lucide-react';
import './index.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState('');

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            currentTranscript += transcript + ' ';
          }
        }

        if (currentTranscript) {
          setText((prev) => prev + currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        setError(`Speech recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        // Automatically restart if we are supposed to be recording
        if (isRecording) {
          try {
            recognition.start();
          } catch (e) {
            // Already started or error
          }
        }
      };

      recognitionRef.current = recognition;
    } else {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update recognition state when isRecording changes
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.start();
        setError('');
      } catch (e) {
        console.error("Recognition already started", e);
      }
    } else {
      recognitionRef.current.stop();
    }
  }, [isRecording]);

  const toggleRecording = () => {
    if (!SpeechRecognition) return;
    setIsRecording(!isRecording);
  };

  const clearText = () => {
    setText('');
    setSummary('');
    setError('');
  };

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setIsSummarizing(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      setError('Error connecting to the summarization server.');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Voice Notes AI</h1>
        <p className="subtitle">Capture your thoughts and generate smart summaries instantly.</p>
      </header>

      <main className="glass-panel">
        <div className="controls">
          <button
            className={`btn ${isRecording ? 'recording' : 'primary'}`}
            onClick={toggleRecording}
            disabled={!SpeechRecognition}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>

          <button
            className="btn"
            onClick={clearText}
            disabled={!text}
          >
            <RefreshCw size={20} />
            Clear
          </button>

          <button
            className="btn primary"
            onClick={handleSummarize}
            disabled={isSummarizing || !text}
          >
            {isSummarizing ? (
              <span className="loader"></span>
            ) : (
              <Wand2 size={20} />
            )}
            Summarize Note
          </button>
        </div>

        {error && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        <div className="textarea-container">
          <div className="status-indicator">
            <span className={`dot ${isRecording ? 'active' : ''}`}></span>
            {isRecording ? 'Listening...' : 'Inactive'}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start recording or type your notes here..."
          />
        </div>

        {summary && (
          <div className="summary-container">
            <div className="summary-header">
              <CheckCircle2 size={24} />
              <h3>AI Summary</h3>
            </div>
            <div className="summary-content">
              {summary}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
