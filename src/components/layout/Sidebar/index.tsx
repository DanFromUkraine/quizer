'use client';

import { RenderNavLinks } from './client';
import { ColorStatusBar } from './ColorStatusBar';
// import { DragHandlerUI } from './UI';

export default function Sidebar() {

        return (
                <nav
                        className='flex flex-col items-center  w-auto h-screen border-r border-r-lightGray sticky top-0 left-0'>
                        <ColorStatusBar />
                        <RenderNavLinks />
                </nav>
        );
}
