'use client';

import { NEW_STORY_PARAMS } from '@/src/constants/newCardParams';
import CustomParam from '@/src/views/books/ui/NewStoryParamsDialog/CustomParam';

export default function CustomParamsList() {
    return (
        <ul>
            <li>
                <h3 className='heading-3 mb-5'>Custom settings:</h3>
            </li>
            {NEW_STORY_PARAMS.map((param) => (
                <CustomParam key={param.title} {...param} />
            ))}
        </ul>
    );
}
