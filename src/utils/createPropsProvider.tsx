"use client"

import { createContext, useContext } from 'react';

export function createPropsProvider<P extends object>(
        displayName?: string
) {
        const Context = createContext<P | undefined>(undefined);

        type ProviderProps = P & { children?: React.ReactNode };

        const Provider = (props: ProviderProps) => {
                const { children, ...rest } = props; // "rest" — це наш P
                const value = rest as P;
                return (
                        <Context.Provider value={value}>
                                {children}
                        </Context.Provider>
                );
        };

        Provider.displayName = displayName ?? 'PropsProvider';

        function usePropsContext() {
                const ctx = useContext(Context);
                if (!ctx) {
                        throw new Error(
                                `${Provider.displayName} must be used within its Provider`
                        );
                }
                return ctx;
        }

        return { Provider, usePropsContext, Context } as const;
}
