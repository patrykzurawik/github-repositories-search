'use server';

import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import octokit from 'lib/octokit';
import { ReposSearchParams, ReposSearchResponse } from 'lib/octokit/types/repos';
import { getSearchSchema } from 'validators/search';

export const fetchCachedData = unstable_cache(
  async (params: ReposSearchParams): Promise<ReposSearchResponse['data']> => {
    console.log('[getCachedRepos] ', JSON.stringify(params));

    const t = await getTranslations();
    const { success, data } = getSearchSchema(t).safeParse(params);

    // TODO: handle better
    if (!success) {
      return {
        total_count: 0,
        items: [],
        incomplete_results: false,
      };
    }

    // return new Promise((resolve) => setTimeout(() => resolve([Math.random() * 101]), 3000));
    return (await octokit.rest.search.repos(data)).data;
  },
  [],
  { revalidate: 60 * 60 }
);