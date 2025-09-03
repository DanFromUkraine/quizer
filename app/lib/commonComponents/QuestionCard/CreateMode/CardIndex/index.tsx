import { createContext, ReactNode, useContext } from 'react';

export const IndexContext = createContext<number>(0);

export function IndexContextProvider({
        children,
        value
}: {
        children: ReactNode;
        value: number;
}) {
        return (
                <IndexContext.Provider value={value}>
                        {children}
                </IndexContext.Provider>
        );
}

export default function CardIndex() {
        const index = useContext(IndexContext);

        return (
                <p className='px-3 py-1.5 text-darker w-fit font-semibold bg-fillbg rounded-normal'>
                        Картка №{index + 1}
                </p>
        );
}
