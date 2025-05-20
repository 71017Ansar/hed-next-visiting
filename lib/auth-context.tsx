"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthState, User, UserRole } from "@/lib/types";
import { CloudCog } from "lucide-react";
import axios from "axios";
import credentialsStore from "@/lib/stores/credentials";

// Mock users for demonstration purposes
// In a real app, you would fetch this from an API
const MOCK_USERS = [
  {
    id: "1",
    email: "superadmin@example.com",
    password: "password",
    name: "Super Admin",
    role: "superadmin" as UserRole,
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "password",
    name: "Admin User",
    role: "admin" as UserRole,
    avatar: "https://images.pexels.com/photos/2216607/pexels-photo-2216607.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "3",
    email: "principal@example.com",
    password: "password",
    name: "Principal User",
    role: "principal" as UserRole,
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: "4",
    email: "employee@example.com",
    password: "password",
    name: "Employee User",
    role: "employee" as UserRole,
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];
interface Data{
  email:string;
  password:string;
}
// Initial auth state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

// Create the auth context
interface AuthContextType extends AuthState {
  login: (data:Data) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [authState, setAuthState] = useState<AuthState>(initialState);
  const router = useRouter();
  const {  setToken,setName,setUserRole,token,name,userRole } = credentialsStore((state:any) => state);

  // Check if user is already logged in on mount
  useEffect(() => {
    const tokenExist = Cookies.get("token");
    
    if (tokenExist) {
      try {
        const user = JSON.parse(tokenExist) ;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Failed to parse stored user", error);
        Cookies.remove("token");
        setAuthState({...initialState, isLoading: false});
      }
    } else {
      setAuthState({...initialState, isLoading: false});
    }
  }, []);

  // Login function

  const login = async (data:Data): Promise<boolean> => {
    // In a real app, you would make an API call to verify credentials
    const res= await axios.post("http://192.168.100.143:3000/api/login", data);
			const result = res.data;
			console.log(result.data)



			if (result.success) {

				// global variables and local storage

				setToken(result.data.token);
				setName(result.data.name);
				setUserRole(result.data.role);


    
    
			
      const safeUser = {
        token: result.data.token,
        userRole: result.data.role,
        name: result.data.name,
      }
			

      // Store in state
      setAuthState({
        user: safeUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      // Store in cookie (7 days expiry)
      Cookies.set("token",JSON.stringify(safeUser), { expires: 3 });
      
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}