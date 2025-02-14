import { expect, test } from '@playwright/test';
import {
  LocatorAppLogo,
  LocatorAppTitle, LocatorFormError, LocatorFormFieldText,
  LocatorSearchForm,
} from 'constants/locators';
import { ROUTE_INDEX, ROUTE_SEARCH } from 'constants/routes';
import { getByPartialTestId, t } from 'tests/fixture';

test.describe('HomePage', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTE_INDEX());
  });

  test('has title and logo', async ({ page }) => {
    await expect(page.getByTestId(LocatorAppTitle)).toHaveText(t('title'));
    await expect(page.getByTestId(LocatorAppLogo)).toBeVisible();
  });

  test('has search input visible and focused', async ({ page }) => {
    const form = await getByPartialTestId(page, LocatorSearchForm);
    const input = await form.getByTestId(LocatorFormFieldText);

    await expect(form).toBeVisible();
    await expect(input).toBeFocused();
  });

  test('has input validation and is redirecting to results', async ({ page }) => {
    const form = await getByPartialTestId(page, LocatorSearchForm);
    const input = await form.getByTestId(LocatorFormFieldText);
    const button = await form.getByRole('button');
    const error = await form.getByTestId(LocatorFormError);

    await expect(error).not.toBeVisible();

    await button.click();

    await expect(error).toBeVisible();

    const q = 'youtube';
    
    await input.fill(q);
    await button.click();

    await page.waitForURL(ROUTE_SEARCH({ q }));
    expect(page.url()).toContain(ROUTE_SEARCH({ q }));
  });
});
