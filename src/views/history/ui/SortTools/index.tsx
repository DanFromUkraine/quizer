import { STORIES_SORT_TOOLS } from '@/src/constants/storiesSortTools';
import SortTool from './SortTool';

export default function SortTools() {
    const sortRuleSelected = 'by_collection';

    return (
        <section>
            <h2 className='heading-2'>Sort by:</h2>
            <ul className='w-[calc(100vw - 40px)] flex gap-2 overflow-x-scroll'>
                {STORIES_SORT_TOOLS.map((sortTool, i) => (
                    <SortTool
                        key={i}
                        sortRuleSelected={sortRuleSelected}
                        {...sortTool}
                    />
                ))}
            </ul>
        </section>
    );
}
