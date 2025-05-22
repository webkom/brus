'use server'

import { Collection } from "mongodb";
import client from "../_lib/mongodb";
import { User } from "../utils/interfaces";

export const getUserCollection = async (): Promise<Collection<User>> => {
  const mongoClient = await client.connect();
  return mongoClient.db("brus").collection<User>("users");
};

export default getUserCollection;