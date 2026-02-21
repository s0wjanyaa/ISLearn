import { useState } from 'react';

const AvatarControls = ({ onPlay, onPause, onReplay, onReset, isPlaying }) => {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 font-extrabold text-lg shadow-xl"
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>
      <button
        onClick={onReplay}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 font-extrabold text-lg shadow-xl"
      >
        🔄 Replay
      </button>
      <button
        onClick={onReset}
        className="px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl hover:from-orange-700 hover:to-yellow-700 transition-all transform hover:scale-105 font-extrabold text-lg shadow-xl"
      >
        ⏹ Reset
      </button>
    </div>
  );
};

export default AvatarControls;
