import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, triggerWallOfShame } from "../utils/hooks";
import { User } from "../utils/interfaces";
import UserImage from "./UserImage";
import Button from "./Button";
import Modal from "./Modal";

type WallOfShameTriggerProps = {
  toggleOpen: () => void;
};

const WallOfShameTrigger: React.FC<WallOfShameTriggerProps> = ({
  toggleOpen,
}) => {
  return <Button onClick={toggleOpen}>Åpne Wall of shame ⚠️🤮🤬</Button>;
};

type WallOfShameContentProps = {
  toggleOpen: () => void;
};

const WallOfShameContent: React.FC<WallOfShameContentProps> = ({
  toggleOpen,
}) => {
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["usersKey"],
    queryFn: getUsers,
  });

  const { mutate: applyWallOfShame } = useMutation({
    mutationFn: async () => {
      // Update the
      const updatedUsers = await triggerWallOfShame();

      // Insert the users received from triggerWallOfShame into the cache
      queryClient.setQueryData(["usersKey"], (usersInCache: User[]) =>
        usersInCache.map((userInCache) => {
          const updatedUser = updatedUsers.find(
            (user) => user.brusName === userInCache.brusName
          );
          return updatedUser ? updatedUser : userInCache;
        })
      );
    },
  });

  const filteredUsers = users
    ?.filter((user) => user.saldo < 0)
    .sort((a, b) => b.saldo - a.saldo);

  return (
    <div
      className="flex flex-col bg-green-100 rounded-sm p-4 pt-2 w-sm gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-row justify-between bg-green-100 rounded-sm">
        <h1 className="mt-2 font-bold text-2xl">Wall of shame</h1>
        <button
          className="relative border-2 rounded-full font-bold w-8 h-8 bottom-4 left-4 bg-amber-100"
          onClick={toggleOpen}
        >
          x
        </button>
      </div>

      {!filteredUsers || filteredUsers.length === 0 ? (
        <span>Ingen brukere med negativ saldo!</span>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {filteredUsers.map((user) => (
              <div
                key={user.github}
                className="flex grow justify-between items-center"
              >
                <UserImage user={user} size={35} />
                <span>{user.name}</span>
                <span>{user.saldo}kr</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => applyWallOfShame()}>
              Gi straff til alle som er negative
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const WallOfShame = () => (
  <Modal Trigger={WallOfShameTrigger} Content={WallOfShameContent} />
);

export default WallOfShame;
