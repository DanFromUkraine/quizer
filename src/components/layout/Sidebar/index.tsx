'use client';

import { RenderNavLinks } from './client';
import { ColorStatusBar } from './ColorStatusBar';
// import { DragHandlerUI } from './UI';

export default function Sidebar() {

        return (
                <nav
                        className='sidebar'>
                        <ColorStatusBar />
                        <RenderNavLinks />
                </nav>
        );
}
