import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

//usecontext is to share data globally across all components
//create a content with a default value of null
//const UserContext = createContext();



const UserContext = createContext<any>(null);

//receives whatever components are inside <UseProvider>
const UserProvider = ({ children }: { children: ReactNode }) => {

    //holds the current logged-in user or null if no one is logged in. setUser to update user
  const [user, setUser] = useState(null);
  const value = { user, setUser }; 

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>; //value is now available to available to all components inside usecontext.provider
};

//it is wrapped around app in main.tsx

export { UserProvider, UserContext };