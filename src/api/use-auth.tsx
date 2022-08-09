// https://usehooks.com/useAuth/

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from ".";
import { Configuration } from "./Configuration";
// import { getUserProfile, loginUser, logoutUser } from "../apis/api";

// change place
export interface User {
  _id: string;
  username: string;
  token: string;
  email: string;
}

export interface ContextValue {
  user: User | null;
  loaded: boolean;
  // loggedSuccess: boolean | null;
  signup: (email: string, password: string) => void;
  signin: (email: string, password: string) => Promise<any>;
  signout: () => void;
}

const DEFAULT_VALUE = {
  user: null,
  loaded: false,
  signup: (email: string, password: string) => {},
  signin: (email: string, password: string) => Promise.resolve(),
  signout: () => {},
};

const authContext = createContext<ContextValue>(DEFAULT_VALUE);

export function ProvideAuth({ children }: { children: any }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<null | User>(null);
  const [loaded, setLoaded] = useState(false);
  // const [loggedSuccess, setLoggedSuccess] = useState(null);

  useEffect(() => {
    const token = Configuration.getInstance().getToken();
    if (token) {
      // setUser({token, _id: "", email: "", username: ""}) // Maybe store it in local storage
      Configuration.getInstance().removeToken();
      setLoaded(true);
      // getUserProfile()
      //   .then(user => setUser(user))
      //   .catch(() => Configuration.getInstance().removeToken())
      //   .finally(() => setLoaded(true));
    } else {
      console.log("missing token");
      setLoaded(true);
    }
  }, []);

  const signin = (email: string, password: string) => {
    return loginUser(email, password)
      .then((user) => {
        Configuration.getInstance().setToken(user.token);
        setUser(user);
      })
      .catch(() => Configuration.getInstance().removeToken());
  };

  const signup = (email: string, password: string) => {
    console.log("singing up" + email + password);
  };

  const signout = () => {
    // logoutUser().then(() => {
    //   Configuration.getInstance().removeToken();
    //   setUser(null);
    // });
  };

  return {
    user,
    loaded,
    signin,
    signup,
    signout,
  };
}
