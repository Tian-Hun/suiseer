import { SuiProvider } from "./sui/provider";
import { RadixUIProvider } from "./radix-ui/provider";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster />
            <RadixUIProvider>
                <SuiProvider>
                    {children}
                </SuiProvider>
            </RadixUIProvider>
        </>
    );
};
