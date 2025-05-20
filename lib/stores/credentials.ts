// // create zustand store and create a varable to store the credentials like token name and role




// import { create } from "zustand";
// import { persist } from "zustand/middleware";

//  import { UserRole } from "@/lib/types";
// // import { User } from "@/lib/models/user";
// // import { UserQuery } from "@/lib/models/user";

// import { UserRole as UserRoleType } from "@/lib/types";

// interface CredentialsState {
//   token: string | null;
//   name: string | null;
//   userRole: UserRole | null;
//   setToken: (token: string | null) => string | null;
//   setName: (user: string | null) => string | null;
//   setUserRole: (userRole: UserRole | null) => UserRole | null;
// }

// export const useCredentialsStore = create<CredentialsState>()
// .persist()
// (
//     (set) => ({
//       token: null,
//       user: null,
//       userRole: null,
//         setToken: (token) => set({ token }),
//         setUser: (user) => set({ user }),
//         setUserRole: (userRole) => set({ userRole }),
//     }),
//     {
//       name: "credentials-storage", // unique name
//       getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
//     }
//     );
//     // create a function to get the user role from the credentials store
//     export const getUserRole = () => {
//         const userRole = useCredentialsStore.getState().userRole;
//         if (userRole) {
//             return userRole;
//         }
//         return null;
//     };









import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Create the store
const credentialsStore = create(
  persist(
    (set) => ({
      token: null,
      name: null,
      userRole: null,
        setToken: (token:string) => set({ token }),
        setName: (user:string) => set({ user }),
        setUserRole: (userRole:string) => set({ userRole }),
    }),


    // store the state data in local storage
    {
      name: 'information-store', // Unique name for the persisted state
      storage: createJSONStorage(() => localStorage), // Use local storage for persistence
      // Other options as needed (e.g., blacklist certain properties)
    }
  )
);

export default credentialsStore;















// import { create } from 'zustand';

// const useInformationStore = create((set) => {
//   return {
//   Group:"",
//     // create a function that updates the group
//     getGroup: (newGroup) => set((state) => ({ Group: newGroup }))
//     ,
//     Class:"",
//     // create a function that updates the class
//     getClass: () => set((state) => ({ Class: state.Class }))
//     ,
//     TimeSlot:"",
//     // create a function that updates the timeslot
//     getTimeSlot: () => set((state) => ({ TimeSlot: state.TimeSlot }))
   
//   };
// });

// export default useInformationStore;