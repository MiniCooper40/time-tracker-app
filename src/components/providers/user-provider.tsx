import { useAuthentication } from "@/src/hooks/use-authentication";
import { ReactNode, useEffect, useState } from "react";
import { getUser } from "@/src/hooks/use-user";
import { createUser } from "@/src/features/auth/api/create-user";
import { User } from "@/src/types/user";
import { UserContext } from "@/src/contexts/user-context";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isCreating, setIsCreating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { session } = useAuthentication();

  useEffect(() => {
    if (
      isFetching ||
      isCreating ||
      !session ||
      !session.user ||
      !session.user.email
    ) {
      if (user) setUser(undefined);
    } else if (!user) {
      setIsFetching(true);
      getUser()
        .then((user) => {
          setUser(user);
        })
        .catch(() => {
          setIsFetching(false);
          setIsCreating(true);
          createUser({
            email: session.user.email as string,
            token: session.user.id,
          })
            .then((user) => {
              setUser(user);
            })
            .finally(() => setIsCreating(false));
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ data: user, isFetching, isCreating }}>
      {children}
    </UserContext.Provider>
  );
};
