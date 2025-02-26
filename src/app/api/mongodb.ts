import { Collection, Db, MongoClient } from "mongodb";
import { User } from "../utils/interfaces";

export const getUserCollection = async (): Promise<Collection<User>> => {
  const client: MongoClient = new MongoClient(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017",
  );
  await client.connect();
  const db: Db = client.db("brus");
  const userCollection = db.collection<User>("users");

  return userCollection;
};
