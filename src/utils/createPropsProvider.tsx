"use client"

import { createContext, useContext } from 'react';

export function createPropsProvider<P extends Record<string, any>>(
        displayName?: string
) {
        const Context = createContext<P | undefined>(undefined);

        type ProviderProps = P & { children?: React.ReactNode };

        const Provider = (props: ProviderProps) => {
                const { children, ...rest } = props as any; // "rest" — це наш P
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
                return ctx as P;
        }

        return { Provider, usePropsContext, Context } as const;
}
