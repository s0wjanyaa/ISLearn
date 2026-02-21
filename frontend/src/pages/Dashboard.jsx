import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken, removeUser } from '../utils/auth';
import { convertToISL, createTranscript } from '../services/api';
import TextInput from '../components/Input/TextInput';
import VoiceInput from '../components/Input/VoiceInput';
import TranscriptPanel from '../components/Transcript/TranscriptPanel';
import TranscriptHistory from '../components/Transcript/TranscriptHistory';
import Avatar3D from '../components/Avatar/Avatar3D';
import AvatarControls from '../components/Avatar/AvatarControls';
import AvatarCustomization from '../components/Avatar/AvatarCustomization';
import AvatarViewer from '../components/AvatarViewer';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import UserDropdown from '../components/UserDropdown';

const Dashboard = ({ user, setUser }) => {
  const [transcript, setTranscript] = useState('');
  const [islText, setIslText] = useState('');
  const [islGrammarDescription, setIslGrammarDescription] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    navigate('/login');
  };

  const handleConvertToISL = async () => {
    if (!transcript.trim()) return;

    try {
      const response = await convertToISL(transcript);
      const { islGrammar, grammarDescription } = response.data;
      setIslText(islGrammar);
      setIslGrammarDescription(grammarDescription || '');
      await createTranscript(transcript, islGrammar);
      playVoiceInstruction(islGrammar);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      alert(message || 'Failed to convert to ISL');
    }
  };

  const playVoiceInstruction = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Performing sign: ${text}. Follow the hand movements and finger placements.`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlay = () => {
    if (!islText) return;
    setIsPlaying(true);
    playVoiceInstruction(islText);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleReplay = () => {
    handlePause();
    setTimeout(() => {
      handlePlay();
    }, 100);
  };

  const handleReset = () => {
    handlePause();
    setIslText('');
    setIslGrammarDescription('');
    setTranscript('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/20 rounded-full blur-2xl"></div>
      </div>

      {/* Header - Larger with Hamburger Menu */}
      <header className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 shadow-xl relative z-10">
        <div className="max-w-full mx-auto px-6 lg:px-16 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              {/* Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <Logo size="md" />
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white hidden sm:block">
                ISL Learning Assistant
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-white font-extrabold text-lg hover:text-yellow-300 transition-colors">About</a>
              <a href="#" className="text-white font-extrabold text-lg hover:text-yellow-300 transition-colors">Features</a>
              <a href="#" className="text-white font-extrabold text-lg hover:text-yellow-300 transition-colors">Help</a>
            </nav>

            <UserDropdown user={currentUser} onLogout={handleLogout} />
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
              <nav className="flex flex-col gap-4 pt-4">
                <a href="#" className="text-white font-extrabold text-lg hover:text-yellow-300 transition-colors">About</a>
                <a href="#" className="text-white font-extrabold text-lg hover:text-yellow-300 transition-colors">Features</a>
                <a href="#" className="text-white font-extrabold text-lg hover:text-yellow-300 transition-colors">Help</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Wide Layout */}
      <main className="flex-1 max-w-full mx-auto px-4 sm:px-8 lg:px-16 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-300px)]">
          {/* Left Column - Input + Transcript + History */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            {/* Input Card */}
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-4 border-blue-400 animate-fade-in flex flex-col">
              <h2 className="text-2xl font-extrabold mb-6 text-blue-700">Input Methods</h2>
              <div className="space-y-6 flex-1">
                <div>
                  <label className="block text-lg font-extrabold text-gray-800 mb-3">Text Input</label>
                  <TextInput
                    value={transcript}
                    onChange={setTranscript}
                    placeholder="Type your text here..."
                  />
                </div>
                <div>
                  <label className="block text-lg font-extrabold text-gray-800 mb-3">Voice Input</label>
                  <VoiceInput
                    onTranscript={setTranscript}
                    isListening={isListening}
                    setIsListening={setIsListening}
                  />
                </div>
              </div>
            </div>

            {/* Live Transcript (short) */}
            <div className="h-72">
              <TranscriptPanel
                transcript={transcript}
                onTranscriptChange={setTranscript}
                onClear={() => {
                  setTranscript('');
                  setIslText('');
                }}
                onConvert={handleConvertToISL}
              />
            </div>

            {/* History directly below transcript */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <TranscriptHistory />
            </div>
          </div>

          {/* Middle Column - Avatar */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-4 border-cyan-400 flex-1 flex flex-col animate-fade-in delay-200 h-full">
              <h2 className="text-2xl font-extrabold mb-6 text-cyan-700">3D Avatar</h2>
              <div className="h-96 mb-6 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                <AvatarViewer
                  avatarType={currentUser?.avatarGender || 'male'}
                  faceColor={currentUser?.avatarFaceColor}
                />
              </div>
              {islText && (
                <div className="mb-6 p-5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border-4 border-blue-300">
                  <p className="text-base text-gray-700 mb-2 font-extrabold">ISL Grammar:</p>
                  <p className="text-xl font-extrabold text-blue-900">{islText}</p>
                  {islGrammarDescription && (
                    <>
                      <p className="text-base text-gray-700 mt-3 mb-1 font-extrabold">Why this order?</p>
                      <p className="text-base text-gray-800">{islGrammarDescription}</p>
                    </>
                  )}
                </div>
              )}
              <div className="mt-auto">
                <AvatarControls
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onReplay={handleReplay}
                  onReset={handleReset}
                  isPlaying={isPlaying}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Avatar Customization */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <AvatarCustomization user={currentUser} onUpdate={setCurrentUser} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
