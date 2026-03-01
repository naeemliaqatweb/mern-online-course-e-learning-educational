import User from "../../models/User.js";

/**
 * @desc Get all users with pagination (excluding admins)
 * @route GET /api/admin/users
 * @access Private (Admin only)
 */
export const getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = { role: 'user' };

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password'); // exclude password field

    const totalUsers = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Count total users (excluding admins)
 * @route GET /api/admin/users/count
 * @access Private (Admin only)
 */
export const countUsers = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'user' });
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Add a new user
 * @route POST /api/admin/users
 * @access Private (Admin only)
 */
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role = 'user', isVerified = false } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const user = new User({
      name,
      email,
      password, // make sure your model has pre-save hashing
      role,
      isVerified,
      verificationCode: null
    });

    await user.save();

    res.status(201).json({ success: true, message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update a user
 * @route PUT /api/admin/users/:id
 * @access Private (Admin only)
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      verificationCode: null
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete a user
 * @route DELETE /api/admin/users/:id
 * @access Private (Admin only)
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
