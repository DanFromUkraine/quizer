import { IDBPDatabase } from 'idb';

export type DB<DataType extends {}> = IDBPDatabase<DataType>;
export type ObservableDatabaseContext<DataType extends {}> = Context<Observable<
        DB<DataType>
> | null>;




export type GeneralDB<DataSchema> = IDBPDatabase<DataSchema>;

type DBContextShape<Schema extends {}> = {
        db: IDBPDatabase<Schema> | null;
};
