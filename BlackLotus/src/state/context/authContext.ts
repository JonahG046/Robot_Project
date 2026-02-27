import { createContext } from "react";

interface AuthContextType {
  currentUser: any | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<any | null>>;
}

export const AuthContext = createContext<AuthContextType | null>({currentUser: null, setCurrentUser: () => {}});