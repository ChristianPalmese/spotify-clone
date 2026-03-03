"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const MyUserContextProvider = ({ children }: Props) => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserDetails = async (userId: string) => {
    return supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
  };

  const getSubscription = async (userId: string) => {
    return supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .eq("user_id", userId)
      .in("status", ["trialing", "active"])
      .single();
  };

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setUser(null);
        setAccessToken(null);
        setIsLoading(false);
        return;
      }

      setUser(session.user);
      setAccessToken(session.access_token);

      const [detailsRes, subscriptionRes] = await Promise.allSettled([
        getUserDetails(session.user.id),
        getSubscription(session.user.id),
      ]);

      if (detailsRes.status === "fulfilled") {
        setUserDetails(detailsRes.value.data);
      }

      if (subscriptionRes.status === "fulfilled") {
        setSubscription(subscriptionRes.value.data);
      }

      setIsLoading(false);
    };

    loadUser();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [supabase]);

  return (
    <UserContext.Provider
      value={{
        accessToken,
        user,
        userDetails,
        subscription,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within MyUserContextProvider");
  }

  return context;
}; 