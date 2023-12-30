import { ReactNode, createContext, useContext, useState } from "react"

interface ManagerData {
    code: string,
    FirstName: string,
    LastName: string,
    Phone_Number: string
}
interface ManagerContextType {
    manager: ManagerData | null;
    setManager: (data: ManagerData | null) => void;
}
const ManagerContext = createContext<ManagerContextType | undefined>(undefined)

export function ManagerProvider({ children }: { children: ReactNode }) {
    const [manager, setManagerData] = useState<ManagerData | null>(null);
    const setManager = (data: ManagerData | null) => {
        setManagerData(data);
    };
    return (
        <ManagerContext.Provider value={{ manager, setManager }}>
            {children}
        </ManagerContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useManager() {
    const context = useContext(ManagerContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}