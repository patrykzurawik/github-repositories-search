import { expect, test } from '@playwright/test';
import {
  LocatorAppLogo,
  LocatorAppTitle, LocatorFormFieldText,
  LocatorSearchForm,
} from 'constants/locators';
import { ROUTE_INDEX } from 'constants/routes';
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

    await expect(form).toBeVisible();
    await expect(form.getByTestId(LocatorFormFieldText)).toBeFocused();
  });
});
