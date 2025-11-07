import { LAYOUT_TEST_IDS } from '@/src/constants/testIds';
import { getSelector } from './helpers';

export const getBooksPageLinkBtn = getSelector(
        LAYOUT_TEST_IDS.booksPageLinkBtn
);
export const getStoriesPageLinkBtb = getSelector(
        LAYOUT_TEST_IDS.storiesPageLinkBtn
);
