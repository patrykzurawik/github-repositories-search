import { expect, test } from '@playwright/test';
import { LocatorAppTitle } from 'constants/locators';
import { ROUTE_INDEX } from 'constants/routes';
import { t } from 'tests/fixture';

test.describe('HomePage', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTE_INDEX());
  });

  test('has title', async ({ page }) => {
    await expect(page.getByTestId(LocatorAppTitle)).toHaveText(t().title);
  });
});
