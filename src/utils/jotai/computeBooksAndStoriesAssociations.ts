import { Story } from '@/src/types/stories';

type AssociationsEntries = [arg0: string, string[]][];

export default function computeBooksAndStoriesAssociations(stories: Story[]) {
       const newEntries = stories.reduce<AssociationsEntries>((entries, curr) => {
                const newEntries = entries;
                const bookId = curr.bookId;
                const bookEntryIndex = entries.findIndex(
                        (rec) => rec[0] === bookId
                );
                if (bookEntryIndex === -1) {
                        newEntries.push([bookId, [curr.id]]);
                } else {
                        const prevStoryIds = newEntries[bookEntryIndex][1];
                        newEntries[bookEntryIndex][1] = [
                                ...prevStoryIds,
                                curr.id
                        ];
                }

                return entries;
        }, []);

       return Object.fromEntries(newEntries)
}
