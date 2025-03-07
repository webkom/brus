"use client";
import FullscreenTrigger from "./components/FullscreenTrigger";
import UserGrid from "./components/UserGrid";
import WallOfShame from "./components/WallOfShame";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <FullscreenTrigger />
      <h1 className="text-4xl text-center py-3">BRUUUUUUUUUSSSS baby</h1>
      <UserGrid />
      <WallOfShame />
    </div>
  );
}
