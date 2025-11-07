import type { Page, Locator } from '@playwright/test';

export type LocatorGetter = (scope: Page | Locator) => Locator;
