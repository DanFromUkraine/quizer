import { deleteDB } from 'idb';
import { DB_NAMES } from '../utils';

export async function deleteThisDB(closeFn: () => void) {
        closeFn();
        console.log('намагаюся закрити ');
        await deleteDB(DB_NAMES.ADD_COLLECTION_PAGE, {
                blocked(version, event) {
                        console.log('blocked', { version, event });
                }
        });
        console.log('Закрилось');
        return;
}
