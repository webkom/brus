import { useEffect, useState } from "react";
import { User } from "../utils/interfaces";
import UserImage from "./UserImage";
import BuyBrusModal from "./BuyBrusModal";

interface userButtonProps {
  user: User;
}

export const UserButton = ({ user }: userButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => {
    setShowModal((prev) => !prev);
  };

  const shortenName = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0] + " " + names[1][0] + ".";
    }
    return names[0];
  };

  function getBorderStyle(saldo: number) {
    let intensity = Math.min(Math.abs(saldo) / 1000, 1); // Normalize to 0-1 range
    let color =
      saldo < 0
        ? `rgba(${intensity * 255}, 0, 0, 1)` // Redder for negative saldo
        : `rgba(0, ${intensity * 200}, 0, 1)`; // Greener for positive saldo

    return {
      border: `4px solid ${color}`,
      borderRadius: "10px",
      padding: "10px",
    };
  }

  // Usage in JSX

  // Usage in JSX

  return (
    <div style={getBorderStyle(user.saldo)}>
      <button
        onClick={handleModalClick}
        className="flex flex-col items-center hover:cursor-pointer"
      >
        <UserImage user={user} />
        <span className="">{shortenName(user.name)}</span>{" "}
      </button>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#ffffff34] flex items-center justify-center"
          onClick={handleModalClick}
        >
          <BuyBrusModal user={user} handleClose={handleModalClick} />
        </div>
      )}
    </div>
  );
};
