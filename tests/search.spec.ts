import { expect, test } from '@playwright/test';
import {
  LocatorAlertError,
  LocatorAlertWarning,
  LocatorAppSpinner,
  LocatorListNoData,
  LocatorSearchList,
} from 'constants/locators';
import { ROUTE_SEARCH } from 'constants/routes';
import { DEFAULT_SEARCH_PARAMS, DEFAULT_SEARCH_PARAMS_ORDER } from 'constants/search';
import { Page } from 'playwright-core';
import { getByPartialTestId } from 'tests/fixture';
import { ReposSearchQueryParams } from 'types/repos';

test.describe('SearchPage', async () => {
  test('is throwing error when wrong params passed to ROUTE_SEARCH', async ({ page }) => {
    await expect(async () => page.goto(ROUTE_SEARCH({} as ReposSearchQueryParams))).rejects.toThrow();
  });

  test('is redirecting to index when no params passed', async ({ page }) => {
    await page.goto('/search');
    await page.waitForURL((currentURL) => !currentURL.pathname.includes('/search'));
    expect(page.url()).not.toContain('/search');
  });

  test('is adding and sorting missing params when only q passed', async ({ page }) => {
    const q = 'youtube';

    await page.goto(ROUTE_SEARCH({ q }));
    expect(page.url()).toContain(ROUTE_SEARCH({ q }));

    const currentUrl = new URL(page.url());
    const paramsArray = Array.from(currentUrl.searchParams.entries());

    const expectedParams = { q, ...DEFAULT_SEARCH_PARAMS };

    const areParamsSortedAndProperlyPopulated = paramsArray.every(([key, value], index) => {
      const expectedKey = DEFAULT_SEARCH_PARAMS_ORDER[index];
      const expectedValue = expectedParams[expectedKey];
      return key === expectedKey && value === String(expectedValue);
    });

    expect(areParamsSortedAndProperlyPopulated).toBe(true);
  });

  test('is showing error when out of range page number passed', async ({ page }) => {
    const params = {
      q: 'youtube',
      page: 100000000,
    };

    await page.goto(ROUTE_SEARCH(params));
    expect(page.url()).toContain(ROUTE_SEARCH(params));

    const error = await getByPartialTestId(page, LocatorAlertError);

    await expect(error).toBeVisible();
  });

  test('is showing warning when out of range results found', async ({ page }) => {
    const params = {
      q: 'youtube',
    };

    await page.goto(ROUTE_SEARCH(params));
    expect(page.url()).toContain(ROUTE_SEARCH(params));

    const warning = await getByPartialTestId(page, LocatorAlertWarning);

    await expect(warning).toBeVisible();
  });

  test('is not showing warning when few results found', async ({ page }) => {
    const params = {
      q: 'youtube123',
    };

    await page.goto(ROUTE_SEARCH(params));
    expect(page.url()).toContain(ROUTE_SEARCH(params));

    const warning = await getByPartialTestId(page, LocatorAlertWarning);

    await expect(warning).not.toBeVisible();
  });
});

test.describe('SearchPage:Results', async () => {
  const getElements = async (page: Page) => {
    const list = await getByPartialTestId(page, LocatorSearchList);
    const spinner = await list.getByTestId(LocatorAppSpinner);
    const results = await list.getByRole('table');
    const noData = await list.getByTestId(LocatorListNoData);

    return { list, spinner, results, noData };
  };

  test('is presenting spinner and existing results list', async ({ page }) => {
    const q = 'youtube';

    await page.goto(ROUTE_SEARCH({ q }));
    expect(page.url()).toContain(ROUTE_SEARCH({ q }));

    {
      const { list, spinner, results } = await getElements(page);

      await expect(list).toBeVisible();
      await expect(spinner).toBeVisible();
      await expect(results).not.toBeVisible();
    }
    {
      const { spinner, results, noData } = await getElements(page);

      await expect(spinner).not.toBeVisible();
      await expect(noData).not.toBeVisible();
      await expect(results).toBeVisible();
    }
  });

  test('is presenting spinner and empty results list', async ({ page }) => {
    const q = 'totallyNonExistingNameRandom123...****';

    await page.goto(ROUTE_SEARCH({ q }));
    expect(page.url()).toContain(ROUTE_SEARCH({ q }));

    {
      const { list, spinner, results } = await getElements(page);

      await expect(list).toBeVisible();
      await expect(spinner).toBeVisible();
      await expect(results).not.toBeVisible();
    }

    {
      const { spinner, results, noData } = await getElements(page);
     
      await expect(spinner).not.toBeVisible();
      await expect(results).toBeVisible();
      await expect(noData).toBeVisible();
    }
  });
});