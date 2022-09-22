import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB().map((x) => {
      return { roomID: x.roomId, roomName: x.roomName };
    });

    return res.status(200).json({ ok: true, rooms });
  }
}
