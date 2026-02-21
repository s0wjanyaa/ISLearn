import User from '../models/User.js';

export const updateAvatarSettings = async (req, res) => {
  try {
    const { avatarGender, avatarFaceColor } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatarGender: avatarGender || req.user.avatarGender,
        avatarFaceColor: avatarFaceColor || req.user.avatarFaceColor
      },
      { new: true }
    ).select('-passwordHash');

    res.json({
      message: 'Avatar settings updated',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatarGender: user.avatarGender,
        avatarFaceColor: user.avatarFaceColor
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
