import { useState, useEffect } from 'react';
import { getTranscripts, deleteTranscript, deleteAllTranscripts } from '../../services/api';

const TranscriptHistory = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTranscripts();
  }, []);

  const loadTranscripts = async () => {
    try {
      const response = await getTranscripts();
      setTranscripts(response.data);
    } catch (error) {
      console.error('Failed to load transcripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transcript?')) return;
    
    try {
      await deleteTranscript(id);
      loadTranscripts();
    } catch (error) {
      alert('Failed to delete transcript');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete all transcripts? This cannot be undone.')) return;
    
    try {
      await deleteAllTranscripts();
      loadTranscripts();
    } catch (error) {
      alert('Failed to clear transcripts');
    }
  };

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-4 border-emerald-400 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-700 font-bold text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-4 border-emerald-400 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-emerald-700">📚 History</h3>
        {transcripts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-base bg-gradient-to-r from-red-200 to-orange-200 text-red-700 rounded-xl hover:from-red-300 hover:to-orange-300 font-bold transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {transcripts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl font-bold">No history yet</p>
            <p className="text-gray-500 text-base mt-3">Your transcripts will appear here</p>
          </div>
        ) : (
          transcripts.map((transcript) => (
            <div
              key={transcript._id}
              className="border-4 border-emerald-200 rounded-xl p-5 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <p className="text-sm text-gray-600 font-bold">
                  {new Date(transcript.timestamp).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(transcript._id)}
                  className="text-red-600 hover:text-red-800 text-lg font-extrabold hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>
              <p className="font-extrabold mb-3 text-gray-900 text-lg">{transcript.originalText}</p>
              <p className="text-blue-700 font-bold text-base">{transcript.islConvertedText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranscriptHistory;
