import { pusher } from "../lib/pusher.js";

export const pusherAuth = (req, res) => {
  const socketid = req.body.socket_id;
  const channel = req.body.channel_name;

  const auth = pusher.authorizeChannel(socketid, channel);
  res.send(auth);
};
