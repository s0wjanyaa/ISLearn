import { useState } from 'react';

const TranscriptPanel = ({ 
  transcript, 
  onTranscriptChange, 
  onClear, 
  onConvert 
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-4 border-blue-400 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-blue-700">Live Transcript</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 text-base bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl hover:from-blue-300 hover:to-cyan-300 font-bold transition-all"
          >
            {editing ? '✓ Done' : '✏️ Edit'}
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 text-base bg-gradient-to-r from-red-200 to-orange-200 text-red-700 rounded-xl hover:from-red-300 hover:to-orange-300 font-bold transition-all"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="flex-1 mb-6 min-h-0">
        <textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          readOnly={!editing}
          className={`w-full h-full p-6 border-4 rounded-xl resize-none text-lg ${
            editing 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-blue-300 bg-blue-50'
          } focus:ring-4 focus:ring-blue-200 transition-all font-semibold`}
          placeholder="Your transcript will appear here..."
        />
      </div>

      <button
        onClick={onConvert}
        disabled={!transcript.trim()}
        className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 text-white py-5 px-6 rounded-xl hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 font-extrabold text-xl shadow-xl disabled:transform-none"
      >
        ✨ Convert to ISL
      </button>
    </div>
  );
};

export default TranscriptPanel;
