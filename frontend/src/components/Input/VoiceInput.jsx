import { useState, useEffect, useRef } from 'react';

const VoiceInput = ({ onTranscript, isListening, setIsListening }) => {
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState('');
  const transcriptRef = useRef('');
  const isListeningRef = useRef(false);
  const recognitionRef = useRef(null);

  // Keep ref in sync with prop
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported. Please use Chrome or Edge browser.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false; // Changed to false for better control
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      console.log('Speech recognition started');
      setError('');
      setIsListening(true);
      isListeningRef.current = true;
    };

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Update transcript - append final results, show interim
      if (finalTranscript) {
        transcriptRef.current += finalTranscript;
      }
      
      const displayText = transcriptRef.current + interimTranscript;
      onTranscript(displayText);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        // Don't show error for no-speech, just restart
        if (isListeningRef.current) {
          setTimeout(() => {
            try {
              recognitionInstance.start();
            } catch (e) {
              console.log('Recognition restart failed');
            }
          }, 100);
        }
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please check your microphone.');
        setIsListening(false);
        isListeningRef.current = false;
      } else if (event.error === 'not-allowed') {
        setError('Microphone permission denied. Please allow microphone access in browser settings.');
        setIsListening(false);
        isListeningRef.current = false;
      } else if (event.error !== 'aborted') {
        setError(`Error: ${event.error}. Please try again.`);
        setIsListening(false);
        isListeningRef.current = false;
      }
    };

    recognitionInstance.onend = () => {
      // Only restart if we're still supposed to be listening
      if (isListeningRef.current) {
        try {
          recognitionInstance.start();
        } catch (e) {
          console.log('Recognition already started or stopped');
        }
      } else {
        transcriptRef.current = '';
      }
    };

    recognitionRef.current = recognitionInstance;
    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
        recognitionInstance.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      setError('Speech recognition not available');
      return;
    }

    if (isListening) {
      // Stop listening
      recognition.stop();
      recognition.abort();
      setIsListening(false);
      isListeningRef.current = false;
      transcriptRef.current = '';
    } else {
      // Start listening
      transcriptRef.current = '';
      setError('');
      try {
        recognition.start();
      } catch (e) {
        console.error('Failed to start recognition:', e);
        setError('Failed to start voice input. Please try again.');
        setIsListening(false);
        isListeningRef.current = false;
      }
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleListening}
        disabled={!recognition}
        className={`w-full py-5 px-6 rounded-xl font-extrabold text-xl transition-all transform hover:scale-105 shadow-xl ${
          isListening
            ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 animate-pulse'
            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
        } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
      >
        {isListening ? '🛑 Stop Recording' : '🎤 Start Voice Input'}
      </button>
      {error && (
        <p className="mt-3 text-base text-red-700 font-bold bg-red-100 p-3 rounded-xl border-2 border-red-300">{error}</p>
      )}
      {isListening && !error && (
        <p className="mt-3 text-base text-green-700 font-bold bg-green-100 p-3 rounded-xl border-2 border-green-300 animate-pulse">
          🎙️ Listening... Speak now
        </p>
      )}
    </div>
  );
};

export default VoiceInput;
