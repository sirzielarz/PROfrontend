// https://usehooks.com/useAuth/
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from ".";
import { Configuration } from "./Configuration";
import { useNavigate, useLocation } from "react-router-dom";

// import { getUserProfile, loginUser, logoutUser } from "../apis/api";
import jwtDecode from "jwt-decode";

// change place
export interface User {
  id: number;
  token: string;
  email: string;
  roles: string[];
  isParent: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
}

export interface MyToken {
  exp: number;
  id: number;
  iss: string;
  roles: string[];
  sub: string;
}

export interface ContextValue {
  user: User | null;
  isAdmin: boolean | undefined;
  isParent: boolean | undefined;
  isTeacher: boolean | undefined;
  loaded: boolean;
  signup: (email: string, password: string) => void;
  signin: (email: string, password: string) => Promise<any>;
  signout: () => void;
}

const DEFAULT_VALUE = {
  isAdmin: undefined,
  isParent: undefined,
  isTeacher: undefined,
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

const useAuth = () => {
  return useContext(authContext);
};
export default useAuth;

function useProvideAuth() {
  const [user, setUser] = useState<null | User>(null);
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  const [isParent, setIsParent] = useState<boolean | undefined>(false);
  const [isTeacher, setIsTeacher] = useState<boolean | undefined>(false);

  function getUserProfile(): User | null {
    const token = Configuration.getInstance().getToken();
    if (token) {
      const decoded = jwtDecode<MyToken>(token);
      const userData: User = {
        id: decoded.id,
        token: token,
        email: decoded.sub,
        roles: decoded.roles,
        isTeacher: decoded.roles.includes("teacher"),
        isParent: decoded.roles.includes("parent"),
        isAdmin: decoded.roles.includes("admin"),
      };

      return userData;
    }
    return null;
  }

  useEffect(() => {
    const userProfile = getUserProfile();
    setUser(userProfile);
    setIsAdmin(userProfile?.isAdmin);
    setIsParent(userProfile?.isParent);
    setIsTeacher(userProfile?.isTeacher);
    console.log(getUserProfile());
    setLoaded(true);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  type LocationState = {
    from: { pathname: string };
  };

  const state = location.state as LocationState;

  const from = state?.from?.pathname || "/";

  const signin = (email: string, password: string) => {
    return loginUser(email, password)
      .then((user) => {
        Configuration.getInstance().setToken(user.token);
        const userProfile = getUserProfile();
        setUser(userProfile);
        setIsAdmin(userProfile?.isAdmin);
        setIsParent(userProfile?.isParent);
        setIsTeacher(userProfile?.isTeacher);
        navigate(from, { replace: true });
      })
      .catch(() => {
        Configuration.getInstance().removeToken();
        throw new Error("Login failed");
      });
  };

  const signup = (email: string, password: string) => {
    // console.log("singing up" + email + password);
  };

  const signout = () => {
    // console.log("before", user);
    Configuration.getInstance().removeToken();
    setUser(null);
    navigate("/login");

    // console.log("after", user);
  };

  return {
    user,
    loaded,
    signin,
    signup,
    signout,
    isAdmin,
    isParent,
    isTeacher,
  };
}
