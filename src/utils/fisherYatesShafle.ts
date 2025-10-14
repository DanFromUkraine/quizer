
export default function shuffleList<Item>(array: Item[]) {
        const newList = [...array];

        for (let i = newList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newList[i], newList[j]] = [newList[j], newList[i]];
        }
        return newList;
}