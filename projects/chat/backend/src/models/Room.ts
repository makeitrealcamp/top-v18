import * as mongoose from "mongoose";

interface Room {
  name: String;
}

const schema = new mongoose.Schema<Room>({
  name: String,
});

export default mongoose.model<Room>("Room", schema);
