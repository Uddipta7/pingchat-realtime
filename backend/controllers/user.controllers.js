// ✅ Updated: controllers/user.controllers.js
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `current user error ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Name is required" });
    }

    console.log("Name:", name);
    console.log("File received?", req.file ? true : false);

    let imageUrl;

    if (req.file) {
      const buffer = req.file.buffer;
      console.log("Uploading to Cloudinary...");

      const cloudinaryRes = await uploadOnCloudinary(buffer);
      imageUrl = cloudinaryRes?.secure_url;

      console.log("Cloudinary Upload Result:", imageUrl);
    }

    const updateData = {
      name,
      ...(imageUrl && { image: imageUrl }),
    };

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile update error:", error); // ✅ log actual error
    return res.status(500).json({ message: `profile error ${error.message}` });
  }
};


export const getOtherUsers = async (req, res) => {
  try {
    let users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `get other users error ${error}` });
  }
};

export const search = async (req, res) => {
  try {
    let { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }
    let users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `search users error ${error}` });
  }
};
