export function getListForUpdate<Item>(original: Item[], idsList: string[]) {
        return original.slice(0, idsList.length);
}

export function getListWithIdsForDelete<Item>(
        original: Item[],
        idsList: string[]
) {
        return idsList.slice(original.length );
}
export function getListForAssert<Item>(original: Item[], idsList: string[]) {
        return original.slice(idsList.length);
}

export function getListWhereNoSuchIds(
        originalIdsList: string[],
        idsToDelete: string[]
) {
        return originalIdsList.filter((id) => !idsToDelete.includes(id));
}

export function getListWithSuchIds(
        originalIdsList: string[],
        idsToDelete: string[]
) {
        return [...originalIdsList, ...idsToDelete];
}
