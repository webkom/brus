import React, { useEffect, useState } from "react";
import { UserButton } from "./UserButton";
import { useQuery } from "@tanstack/react-query";
import { getUsers, refetchActiveMembers } from "../utils/hooks";
import { User } from "../utils/interfaces";

interface UserGridProps {
  className?: string;
}

const UserGrid: React.FC<UserGridProps> = ({ className }) => {
  // Uncomment the following useEffect to add active members to database
  // useEffect(() => {
  //   refetchActiveMembers();
  // }, []);

  const {
    data: users,
    isFetching,
    isError,

    refetch,
  } = useQuery({
    queryKey: ["usersKey"],
    queryFn: getUsers,
  });

  if (isFetching) {
    return <div className="m-auto">Loading users</div>;
  }

  if (isError || !users || users.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <span>Error loading users </span>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-5 gap-4 p-4 sm:grid-cols-5 max-w-200 m-auto ${className}`}
    >
      {users
        .sort((a: User, b: User) => b.saldo - a.saldo)
        .map((user) => (
          <UserButton key={user.brusName} user={user} />
        ))}
    </div>
  );
};

export default UserGrid;
