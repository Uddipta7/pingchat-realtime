import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const sender = req.userId;
        const { receiver } = req.params;
        const { message } = req.body;

        let image;
        if (req.file) {
            try {
                image = await uploadOnCloudinary(req.file.path);
            } catch (uploadErr) {
                return res.status(500).json({ message: `Image upload error: ${uploadErr.message}` });
            }
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });

        const newMessage = await Message.create({
            sender,
            receiver,
            message,
            image
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            });
        } else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        const receiverSocketId = getReceiverSocketId(receiver);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        return res.status(500).json({ message: `send Message error ${error}` });
    }
};

export const getMessages = async (req, res) => {
    try {
        const sender = req.userId;
        const { receiver } = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        }).populate("messages");

        return res.status(200).json(conversation?.messages);
    } catch (error) {
        return res.status(500).json({ message: `get Message error ${error}` });
    }
};
