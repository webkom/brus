import { useQuery, useQueryClient } from "@tanstack/react-query";
import { refetchActiveMembers, triggerWallOfShame } from "../utils/hooks";
import { MinimalUser, User } from "../utils/interfaces";

const WallOfShameButton = () => {
  const queryClient = useQueryClient();

  const { refetch, isFetching, error } = useQuery({
    queryKey: ["wallofshame"],
    queryFn: () =>
      triggerWallOfShame()
        .then((data) => {
          data.forEach((updatedUser: User) => {
            if (updatedUser) {
              queryClient.setQueryData(["usersKey"], (usersInCache: User[]) => {
                return usersInCache.map((userInCache) =>
                  userInCache.brusName === updatedUser.brusName
                    ? updatedUser
                    : userInCache,
                );
              });
            } else {
              // If updated data is not returned, refetch all users
              queryClient.invalidateQueries({ queryKey: ["usersKey"] });
            }
          });
          window.alert(
            "Brukere som fortsatt er i minus: \n" +
              data
                .filter((u: User) => u.saldo < 0)
                .map(
                  (o: MinimalUser) =>
                    `User: ${o.brusName} Saldo: ${o.saldo} \n`,
                ),
          );
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["usersKey"] });
        }),
    enabled: false,
  });
  return (
    <button
      className="border-4 p-4"
      onClick={() => {
        if (window.confirm("Er du sikker på at du vil applye shame?"))
          refetch();
      }}
    >
      Wallofshame ⚠️🤮🤬
    </button>
  );
};

export default WallOfShameButton;
