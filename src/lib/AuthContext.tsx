"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: string;
  name: string;
  createdAt: string;
};

type UserData = {
  notes: Array<{ id: string; content: string; createdAt: string }>;
  favorites: string[];
  borisHistory: Array<{ role: "user" | "boris"; content: string }>;
  settings: {
    defaultShift: "day" | "evening" | "night" | null;
    defaultBorisMode: "medicine" | "icu" | "work";
  };
};

type AuthContextType = {
  user: User | null;
  userData: UserData | null;
  isLoading: boolean;
  login: (name: string, pin: string) => boolean;
  register: (name: string, pin: string) => boolean;
  logout: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  addNote: (content: string) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (toolId: string) => void;
  saveBorisHistory: (history: Array<{ role: "user" | "boris"; content: string }>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER_DATA: UserData = {
  notes: [],
  favorites: [],
  borisHistory: [],
  settings: {
    defaultShift: null,
    defaultBorisMode: "medicine",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("nursecore_current_user");
    if (storedUserId) {
      const users = JSON.parse(localStorage.getItem("nursecore_users") || "{}");
      if (users[storedUserId]) {
        setUser(users[storedUserId].user);
        setUserData(users[storedUserId].data || DEFAULT_USER_DATA);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user data when it changes
  useEffect(() => {
    if (user && userData) {
      const users = JSON.parse(localStorage.getItem("nursecore_users") || "{}");
      users[user.id] = { user, data: userData };
      localStorage.setItem("nursecore_users", JSON.stringify(users));
    }
  }, [user, userData]);

  function hashPin(pin: string): string {
    // Simple hash for demo - in production use bcrypt
    let hash = 0;
    for (let i = 0; i < pin.length; i++) {
      const char = pin.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  function login(name: string, pin: string): boolean {
    const users = JSON.parse(localStorage.getItem("nursecore_users") || "{}");
    const hashedPin = hashPin(pin);

    // Find user by name and pin
    const userId = Object.keys(users).find(
      (id) => users[id].user.name.toLowerCase() === name.toLowerCase() && users[id].pin === hashedPin
    );

    if (userId) {
      setUser(users[userId].user);
      setUserData(users[userId].data || DEFAULT_USER_DATA);
      localStorage.setItem("nursecore_current_user", userId);
      return true;
    }
    return false;
  }

  function register(name: string, pin: string): boolean {
    const users = JSON.parse(localStorage.getItem("nursecore_users") || "{}");

    // Check if name already exists
    const nameExists = Object.values(users).some(
      (u: unknown) => (u as { user: User }).user.name.toLowerCase() === name.toLowerCase()
    );
    if (nameExists) return false;

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };

    users[newUser.id] = {
      user: newUser,
      pin: hashPin(pin),
      data: DEFAULT_USER_DATA,
    };

    localStorage.setItem("nursecore_users", JSON.stringify(users));
    localStorage.setItem("nursecore_current_user", newUser.id);
    setUser(newUser);
    setUserData(DEFAULT_USER_DATA);
    return true;
  }

  function logout() {
    localStorage.removeItem("nursecore_current_user");
    setUser(null);
    setUserData(null);
  }

  function updateUserData(data: Partial<UserData>) {
    if (!userData) return;
    setUserData({ ...userData, ...data });
  }

  function addNote(content: string) {
    if (!userData) return;
    const newNote = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
    };
    setUserData({
      ...userData,
      notes: [newNote, ...userData.notes],
    });
  }

  function deleteNote(id: string) {
    if (!userData) return;
    setUserData({
      ...userData,
      notes: userData.notes.filter((n) => n.id !== id),
    });
  }

  function toggleFavorite(toolId: string) {
    if (!userData) return;
    const favorites = userData.favorites.includes(toolId)
      ? userData.favorites.filter((f) => f !== toolId)
      : [...userData.favorites, toolId];
    setUserData({ ...userData, favorites });
  }

  function saveBorisHistory(history: Array<{ role: "user" | "boris"; content: string }>) {
    if (!userData) return;
    setUserData({ ...userData, borisHistory: history.slice(-20) }); // Keep last 20 messages
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        isLoading,
        login,
        register,
        logout,
        updateUserData,
        addNote,
        deleteNote,
        toggleFavorite,
        saveBorisHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
