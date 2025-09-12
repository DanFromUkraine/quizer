import { openDB } from 'idb';
import { DB } from '@/src/types/globals';

export async function getDB<DataSchema extends {}>({
        dbName,
        upgradeAction
}: {
        dbName: string;
        upgradeAction: (database: DB<DataSchema>) => void;
}) {
        return openDB<DataSchema>(dbName, 1, {
                upgrade: upgradeAction
        });
}
