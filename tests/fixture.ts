import tEn from 'i18n/messages/en.json';
import { get } from 'immutable';
import { Locator, Page } from 'playwright-core';

export const t = (key: string) => get(tEn, key) as string;

export const getByPartialTestId = (el: Page | Locator, testId: string) =>
  el.locator(`[data-ta*="${testId}"]`);