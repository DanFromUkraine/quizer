export type SetState<DataType> = Dispatch<SetStateAction<DataType>>;

export type ObjWithId = {
        id: string;
};

export type DB<DataType extends {}> = IDBPDatabase<DataType>;
