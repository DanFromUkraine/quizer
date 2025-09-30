import { SortTool as SortToolType } from '@/src/types/historyPage';

export default function SortTool({
        title,
        id,
        sortRuleSelected
}: SortToolType & {
        sortRuleSelected: string;
}) {
        const state = sortRuleSelected === id ? 'selected' : '';

        return (
                <li
                        data-state={state}
                        className='span rounded-md bg-gray-300 p-2 hover:bg-gray-400 duration-100 data-[state=selected]:bg-gray-500 data-[state=selected]:text-white'>
                        {title}
                </li>
        );
}
