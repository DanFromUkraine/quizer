import { AvailableCardTypes } from '@/src/types/globals';

export function getListForUpdate<Item>(original: Item[], idsList: string[]) {
        return original.slice(0, idsList.length);
}

export function getListWithIdsForDelete<Item>(
        original: Item[],
        idsList: string[]
) {
        return idsList.slice(original.length);
}
export function getListForInsert<Item>(original: Item[], idsList: string[]) {
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
        idsToInsert: string[]
) {
        return [...originalIdsList, ...idsToInsert];
}

export function getCardType({
        targetId,
        explicitCardIds,
        shortCardIds
}: {
        targetId: string;
        explicitCardIds: string[];
        shortCardIds: string[];
}): AvailableCardTypes {
        const idIsInExplicitCardIds = explicitCardIds.includes(targetId);
        const idIsInShortCardIds = shortCardIds.includes(targetId);
        if (idIsInExplicitCardIds) return 'explicit';
        if (idIsInShortCardIds) return 'short';
        throw `id ${targetId} is absent in both explicit card ids and short card ids`;
}

export function getPlayCardType({
        targetId,
        explicitCardStoryIds,
        typeInCardStoryIds,
        isCorrectCardStoryIds
}: {
        targetId: string;
        explicitCardStoryIds: string[];
        typeInCardStoryIds: string[];
        isCorrectCardStoryIds: string[];
}) {
        const idIsInExplicitCardStoryIds =
                explicitCardStoryIds.includes(targetId);
        const idIsInTypeInCardStoryIds = typeInCardStoryIds.includes(targetId);
        const idIsInIsCorrectCardStoryIds =
                isCorrectCardStoryIds.includes(targetId);
        if (idIsInExplicitCardStoryIds) return 'play-explicit';
        if (idIsInIsCorrectCardStoryIds) return 'play-isCorrect';
        if (idIsInTypeInCardStoryIds) return 'play-typeIn'
}
