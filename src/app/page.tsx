import getUserCollection from "./api/getUserCollection";
import { User } from "./utils/interfaces";
import { PersonGrid } from "./components/PersonGrid";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
export default async function Home() {
  let users: User[] = [];
  try {
    const collection = await getUserCollection();
    users = (await collection
      .find({}, { projection: { _id: 0 } })
      .toArray()) as User[];
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }

  return (
    <main className="max-w-[1180px] mx-auto px-7 py-12">
      <Header users={users} />
      <PersonGrid users={users} />
      <Footer users={users} />
    </main>
  );
}
