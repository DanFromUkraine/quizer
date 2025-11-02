import { getOptionContainer } from '@/tests/end-to-end/EditBookPage/selectors';
import {
        MixedCard,
        TestExplicitCardViaText,
        TestShortCardViaText
} from '@/tests/end-to-end/EditBookPage/types';
import test, { expect, Locator } from '@playwright/test';
import { getShortCardAsText__MIX_MODE, getShortCardAsText__SHORT_MODE } from '@/src/utils/cardsAsText/helpers';

export function pickCardsOfShortType(list: MixedCard[]) {
        return list.filter((card) => card.type === 'short');
}

export async function expectTrimmedValue(locator: Locator, expected: string) {
        await expect(locator).toBeVisible();
        const v = await locator.inputValue();
        expect(v.trim()).toBe(expected);
}

export async function checkIfTheresEnoughOfOpts({
        cardEl,
        expectedCount
}: {
        cardEl: Locator;
        expectedCount: number;
}) {
        await test.step('Expect num of options to correspond to example options list length', async () => {
                await expect(getOptionContainer(cardEl)).toHaveCount(
                        expectedCount
                );
        });
}

export function normalizeForCompare(s: string) {
        return (
                s
                        // Delete all non-breaking spaces and other Unicode spaces
                        .replace(
                                /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g,
                                ''
                        )
                        // Delete zero-width symbols
                        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
                        // Delete any special symbols (New rows, tabs, spaces, etc.)
                        .replace(/\s+/g, '')
                        .trim()
        );
}

export function mixEqualListsToSeeOnlyShortCardChanges(
        initialList: MixedCard[],
        resultList: MixedCard[]
): MixedCard[] {
        if (initialList.length !== resultList.length) {
                throw new Error('lists must have equal length');
        }

        const shortCardsFromResultList = resultList.filter(
                (c): c is TestShortCardViaText => c.type === 'short'
        );

        let shortIndex = 0;
        const fixture: MixedCard[] = [];

        for (const item of initialList) {
                if (item.type === 'explicit') {
                        fixture.push(item);
                } else {
                        if (shortIndex >= shortCardsFromResultList.length) {
                                throw new Error(
                                        'not enough short cards in resultList to replace initialList shorts'
                                );
                        }
                        fixture.push(shortCardsFromResultList[shortIndex++]);
                }
        }

        if (shortIndex !== shortCardsFromResultList.length) {
                throw new Error(
                        'extra short cards in resultList that were not consumed'
                );
        }

        return fixture;
}
 function getOneExpCardAsText_forTest({
        title,
        subtitle,
        explanation,
        options
}: Omit<TestExplicitCardViaText, 'type'>) {
        return `
        \n&& ${title}
        \n &s ${subtitle}
         ${options
                 .map(
                         ({ optionTitle, isCorrect }) =>
                                 `\n \t %% ${isCorrect ? '%correct%' : ''} ${optionTitle}`
                 )
                 .join('')}
        \n &e ${explanation}
        `;
}

export function getCardsAsText_TEST_ONLY__MIX_MODE(
        cardsList: MixedCard[]
) {
        return cardsList
                .map((card) =>
                        card.type === 'explicit'
                                ? getOneExpCardAsText_forTest(card)
                                : getShortCardAsText__MIX_MODE({
                                          term: card.term,
                                          definition: card.definition
                                  })
                )
                .join('');
}

export function getCardsAsText_TEST_ONLY__SHORT_MODE(
        cardsList: TestShortCardViaText[]
) {
        return cardsList
                .map(({ type: _type, ...card }) =>
                        getShortCardAsText__SHORT_MODE({ ...card })
                )
                .join('');
}