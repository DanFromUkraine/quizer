import { IconType } from 'react-icons';
import { BsFillCollectionFill } from 'react-icons/bs';
import { LAYOUT_TEST_IDS } from '@/src/constants/testIds';
import { FaHistory } from 'react-icons/fa';

export type LinkType = {
    href: string;
    Icon: IconType;
    text: string;
    testId: string;
};

export const NAV_LINKS: LinkType[] = [
    {
        href: '/',
        Icon: BsFillCollectionFill,
        text: 'Home',
        testId: LAYOUT_TEST_IDS.booksPageLinkBtn
    },
    {
        href: '/history',
        Icon: FaHistory,
        text: 'History',
        testId: LAYOUT_TEST_IDS.storiesPageLinkBtn
    }
];