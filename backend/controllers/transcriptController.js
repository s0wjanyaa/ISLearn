import Transcript from '../models/Transcript.js';

export const getTranscripts = async (req, res) => {
  try {
    const transcripts = await Transcript.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .select('-userId');
    
    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTranscript = async (req, res) => {
  try {
    const { originalText, islConvertedText } = req.body;

    const transcript = await Transcript.create({
      userId: req.user._id,
      originalText,
      islConvertedText
    });

    res.status(201).json(transcript);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTranscript = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transcript = await Transcript.findOne({
      _id: id,
      userId: req.user._id
    });

    if (!transcript) {
      return res.status(404).json({ message: 'Transcript not found' });
    }

    await Transcript.findByIdAndDelete(id);
    res.json({ message: 'Transcript deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllTranscripts = async (req, res) => {
  try {
    await Transcript.deleteMany({ userId: req.user._id });
    res.json({ message: 'All transcripts deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
