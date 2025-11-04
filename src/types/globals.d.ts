import { IDBPDatabase } from 'idb';

export type SetState<DataType> = Dispatch<SetStateAction<DataType>>;

export type Config<T = object> = T;

export type ObjWithId = {
        id: string;
};

export type DB<DataType> = IDBPDatabase<DataType>;

export type Serializable = string | number | boolean | bigint | symbol;
export type AvailableCardTypes = 'explicit' | 'short';
