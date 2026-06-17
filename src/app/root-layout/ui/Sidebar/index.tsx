'use client';

import { RenderNavLinks } from './RenderNavLinks';
import { ColorStatusBar } from './ColorStatusBar';

export default function Sidebar() {
    return (
        <nav className='border-r-lightGray max-sm:bg-lightestGray sticky top-0 left-0 z-20 flex h-screen w-auto items-center border-r bg-white max-[350px]:w-7/12 max-sm:fixed max-sm:top-auto max-sm:bottom-5 max-sm:left-2 max-sm:mx-auto max-sm:grid max-sm:h-[72px] max-sm:w-9/12 max-sm:grid-cols-[auto_1fr] max-sm:items-stretch max-sm:overflow-hidden max-sm:rounded-xl sm:flex-col sm:shadow-[8px_0_28px_rgba(15,23,42,0.08)]'>
            <ColorStatusBar />
            <RenderNavLinks />
        </nav>
    );
}
