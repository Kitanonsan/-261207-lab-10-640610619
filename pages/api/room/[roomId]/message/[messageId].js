import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  if (req.method === "DELETE") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const roomIndex = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIndex === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const messageIndex = rooms[roomIndex].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (messageIndex === -1) {
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    }
    rooms[roomIndex].messages.splice(messageIndex, 1);
    writeDB(rooms);
    return res.status(200).json({ ok: true });
  }
}
