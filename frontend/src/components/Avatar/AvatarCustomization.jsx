import { useState, useEffect } from 'react';
import { updateAvatarSettings } from '../../services/api';

const skinTones = [
  { name: 'Light', value: '#FFDBAC' },
  { name: 'Medium Light', value: '#F1C27D' },
  { name: 'Medium', value: '#E0AC69' },
  { name: 'Medium Dark', value: '#C68642' },
  { name: 'Dark', value: '#8D5524' }
];

const AvatarCustomization = ({ user, onUpdate }) => {
  const [gender, setGender] = useState(user?.avatarGender || 'male');
  const [faceColor, setFaceColor] = useState(user?.avatarFaceColor || '#FFDBAC');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setGender(user.avatarGender);
      setFaceColor(user.avatarFaceColor);
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateAvatarSettings(gender, faceColor);
      onUpdate({ ...user, avatarGender: gender, avatarFaceColor: faceColor });
      alert('Avatar settings saved!');
    } catch (error) {
      alert('Failed to save avatar settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-4 border-yellow-400">
      <h3 className="text-2xl font-extrabold mb-6 text-yellow-700">🎨 Avatar Customization</h3>
      
      <div className="space-y-8">
        <div>
          <label className="block text-lg font-extrabold text-gray-800 mb-4">
            Gender
          </label>
          <div className="flex gap-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => {
                  setGender(e.target.value);
                  onUpdate({ ...user, avatarGender: e.target.value, avatarFaceColor: faceColor });
                }}
                className="mr-3 w-6 h-6 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-bold text-gray-800 text-lg">👨 Male</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => {
                  setGender(e.target.value);
                  onUpdate({ ...user, avatarGender: e.target.value, avatarFaceColor: faceColor });
                }}
                className="mr-3 w-6 h-6 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-bold text-gray-800 text-lg">👩 Female</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-lg font-extrabold text-gray-800 mb-4">
            Skin Tone
          </label>
          <div className="grid grid-cols-5 gap-4">
            {skinTones.map((tone) => (
              <button
                key={tone.value}
                onClick={() => {
                  setFaceColor(tone.value);
                  onUpdate({ ...user, avatarGender: gender, avatarFaceColor: tone.value });
                }}
                className={`h-16 rounded-xl border-4 transition-all transform hover:scale-110 ${
                  faceColor === tone.value
                    ? 'border-blue-600 ring-4 ring-blue-300 shadow-xl scale-110'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                style={{ backgroundColor: tone.value }}
                title={tone.name}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 text-white py-5 px-6 rounded-xl hover:from-cyan-700 hover:via-blue-700 hover:to-emerald-700 disabled:opacity-50 transition-all transform hover:scale-105 font-extrabold text-xl shadow-xl disabled:transform-none"
        >
          {loading ? '💾 Saving...' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default AvatarCustomization;
