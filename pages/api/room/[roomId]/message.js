import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdIndex = rooms.findIndex((x) => x.roomId === id);
    if (roomIdIndex === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const messagesRes = rooms[roomIdIndex].messages;
    return res.status(200).json({ ok: true, messages: messagesRes });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdIndex = rooms.findIndex((x) => x.roomId === id);
    if (roomIdIndex === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    //read request body
    const text = req.body.text;
    //create new id
    const newId = uuidv4();
    if (typeof text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid text input" });

    const newMessage = { messageId: newId, text: text };
    rooms[roomIdIndex].messages.push(newMessage);
    console.log(rooms);

    writeDB(rooms);

    return res.status(200).json({
      ok: true,
      message: newMessage,
    });
  }
}
