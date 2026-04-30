"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { User } from "../utils/interfaces";
import { BrusType } from "../utils/constants";
import { PersonCard } from "./PersonCard";
import { PersonModal } from "./PersonModal";
import { BrandChips } from "./BrandChips";
import { ShameCountdown } from "./ShameCountdown";
import { Toast, ToastData } from "./Toast";

let toastId = 0;

export function PersonGrid({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activebrands, setActiveBrands] = useState<Set<BrusType>>(new Set());
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const router = useRouter();

  const addToast = useCallback((data: Omit<ToastData, "id">) => {
    setToasts((prev) => [...prev, { ...data, id: ++toastId }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const visibleUsers =
    activebrands.size > 0
      ? users.filter((u) =>
          u.history?.some((e) => activebrands.has(e.brusType as BrusType)),
        )
      : users;

  function handleSuccess(updated: User) {
    setUsers((prev) =>
      prev.map((u) => (u.brusName === updated.brusName ? updated : u)),
    );
  }

  function handleClose() {
    setSelectedUser(null);
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <BrandChips active={activebrands} onChange={setActiveBrands} />
        <ShameCountdown />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {visibleUsers.map((user) => (
          <PersonCard
            key={user.brusName}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <PersonModal
            key={selectedUser.brusName}
            user={selectedUser}
            onClose={handleClose}
            onSuccess={handleSuccess}
            onToast={addToast}
          />
        )}
      </AnimatePresence>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
