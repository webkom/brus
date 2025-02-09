import React, { useState } from "react";
import { UserButton } from "./UserButton";
import { User } from "../utils/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../utils/hooks";

interface UserGridProps {
  className?: string;
}

const UserGrid: React.FC<UserGridProps> = ({ className }) => {
  const [users, setUsers] = useState<User[]>([]);
  const {data: users, isLoading, isError, refetch} = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (getUsersQuery.isLoading) {
    return <div className="m-auto">Loading users</div>;
  }

  if (getUsersQuery.isError || !getUsersQuery.data) {
    return (
      <div className="flex flex-col items-center">
        <span>Error loading users </span>
        <button onClick={() => getUsersQuery.refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-5 gap-4 p-4 sm:grid-cols-5 max-w-200 m-auto ${className}`}
    >
      {getUsersQuery.data.map((user) => (
        <UserButton key={user.brusName} user={user} />
      ))}
    </div>
  );
};

export default UserGrid;
