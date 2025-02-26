import { useQuery, useQueryClient } from "@tanstack/react-query";
import { refetchActiveMembers, triggerWallOfShame } from "../utils/hooks";
import { MinimalUser } from "../utils/interfaces";

const WallOfShameButton = () => {
  const queryClient = useQueryClient();

  const { refetch, isFetching, error } = useQuery({
    queryKey: ["wallofshame"],
    queryFn: () =>
      triggerWallOfShame()
        .then((data) =>
          window.alert(
            "Brukere som fortsatt er i minus: \n" +
              data.map(
                (o: MinimalUser) => `User: ${o.brusName} Saldo: ${o.saldo} \n`,
              ),
          ),
        )
        .then(() => {
          queryClient.refetchQueries({ queryKey: ["usersKey"] });
          queryClient.invalidateQueries({ queryKey: ["usersKey"] });
        }),
    enabled: false,
  });
  return (
    <button
      style={{ border: "1px solid black" }}
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
