"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../utils/interfaces";
import { PersonCard } from "./PersonCard";
import { PersonModal } from "./PersonModal";

export function PersonGrid({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  function handleSuccess(updated: User) {
    setUsers((prev) =>
      prev.map((u) => (u.brusName === updated.brusName ? updated : u))
    );
  }

  function handleClose() {
    setSelectedUser(null);
    router.refresh();
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {users.map((user) => (
          <PersonCard
            key={user.brusName}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      {selectedUser && (
        <PersonModal
          user={selectedUser}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
