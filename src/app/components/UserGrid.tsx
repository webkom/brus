import React from "react";
import { UserButton } from "./UserButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, refetchActiveMembers } from "../utils/hooks";
import { User } from "../utils/interfaces";
import Button from "./Button";

interface UserGridProps {
  className?: string;
}

const UserGrid: React.FC<UserGridProps> = ({ className }) => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["usersKey"],
    queryFn: getUsers,
  });

  const queryClient = useQueryClient();

  const refetchMembers = useMutation<void, string>({
    mutationFn: refetchActiveMembers,
    onSuccess: () => {
      // Force reload of users after successfully refetching active members
      queryClient.invalidateQueries({ queryKey: ["usersKey"] });
    },
  });

  if (isLoading) {
    return <div className="m-auto">Laster inn brukere</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center mt-4 gap-3">
        <span>Klarte ikke laste inn brukere</span>
        <Button onClick={() => refetch()}>Prøv igjen</Button>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center my-4 gap-3">
        <span>Fant ingen brukere :&apos;(</span>
        <Button onClick={() => refetch()}>Prøv igjen</Button>
        {refetchMembers.isError && <span>{refetchMembers.error}</span>}
        <Button onClick={() => refetchMembers.mutate()}>
          Oppdater brukere fra members
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-5 gap-4 p-4 sm:grid-cols-5 max-w-200 m-auto ${className}`}
    >
      {users
        .sort((a: User, b: User) => a.name.localeCompare(b.name))
        .map((user) => (
          <UserButton key={user.brusName} user={user} />
        ))}
    </div>
  );
};

export default UserGrid;
