const TextInput = ({ value, onChange, placeholder = "Enter text..." }) => {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 border-4 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none text-lg font-semibold"
        rows="5"
      />
    </div>
  );
};

export default TextInput;
