import { convertToISL } from '../services/islConverter.js';

export const convertToISLGrammar = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const result = await convertToISL(text);
    res.json(result);
  } catch (error) {
    if (error.code === 'PHRASE_NOT_SUPPORTED') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
