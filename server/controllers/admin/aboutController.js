import About from "../../models/About.js";

// Create
export const createAbout = async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const about = new About({ title, description, type, image: imagePath });
    await about.save();

    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ message: "Error creating about", error: err.message });
  }
};

// Read
export const getAllAbout = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });
    res.json(abouts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching about", error: err.message });
  }
};

// Update
export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { title, description, type };
    if (imagePath) updateData.image = imagePath;

    const updated = await About.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating about", error: err.message });
  }
};

// Delete
export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    await About.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting about", error: err.message });
  }
};
