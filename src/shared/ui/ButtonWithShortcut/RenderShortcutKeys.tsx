import { Fragment } from 'react';

export default function RenderShortcutKeys({
    shortcutKeys
}: {
    shortcutKeys: string[];
}) {
    return shortcutKeys.map((shortKey, i) => (
        <Fragment key={i}>
            {i !== 0 && '+'}
            <p className='text-lightGray rounded-normal border border-gray-500 p-1 text-xs'>
                {shortKey}
            </p>
        </Fragment>
    ));
}
