import cloudinary from "../lib/cloudinary.js";
import { pusher } from "../lib/pusher.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const myId = req.user._id;
    const { id: receiverId } = req.params;

    // validation
    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required" });
    }
    if (myId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself" });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(400).json({ message: "Receiver does not exist" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    await pusher.trigger(
      `private-chat-${receiverId}`,
      "new-message",
      newMessage
    );

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ createdAt: -1 });

    const lastMessageMap = new Map();

    for (const msg of messages) {
      const partnerId =
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString();

      if (!lastMessageMap.has(partnerId)) {
        lastMessageMap.set(partnerId, msg);
      }
    }

    const chatPartnerIds = Array.from(lastMessageMap.keys());

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    const result = chatPartners.map((user) => ({
      ...user.toObject(),
      lastMessage: lastMessageMap.get(user._id.toString()),
    }));

    result.sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getChatPartners controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
