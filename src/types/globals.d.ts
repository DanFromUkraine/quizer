export type SetState<DataType> = Dispatch<SetStateAction<DataType>>;

export type ObjWithId = {
        id: string;
};

export type DB<DataType extends {}> = IDBPDatabase<DataType>;

export type Serializable = string | number | boolean | bigint | symbol;
export type AvailableCardTypes = 'explicit' | 'short';

