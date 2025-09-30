import { STORIES_SORT_TOOLS } from '@/src/constants/storiesSortTools';
import SortTool from '@/src/components/history_page/SortTools/client';

export default function SortTools() {
        const sortRuleSelected = "by_collection";

        return (
                <section>
                        <h2 className="heading-2">Sort by:</h2>
                        <ul className="flex gap-2">
                                {STORIES_SORT_TOOLS.map((sortTool, i) => (
                                        <SortTool key={i} sortRuleSelected={sortRuleSelected} {...sortTool} />
                                ))}
                        </ul>
                </section>
        );
}
