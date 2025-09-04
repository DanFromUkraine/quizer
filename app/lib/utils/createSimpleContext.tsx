'use client';

import { createContext, ReactNode } from 'react';

export default function createSimpleContextProviderPair<DataType>({
        defaultData,
        useGetData
}: {
        defaultData: DataType;
        useGetData: () => DataType;
}) {
        const Context = createContext<DataType>(defaultData);
        const Provider = ({ children }: { children: ReactNode }) => {
                const data = useGetData();
                return (
                        <Context.Provider value={data}>
                                {' '}
                                {children}{' '}
                        </Context.Provider>
                );
        };

        return [Context, Provider] as const;
}
