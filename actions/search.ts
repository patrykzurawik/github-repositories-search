'use server';

import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import octokit from 'lib/octokit';
import { FormState } from 'types/form/state';
import { ReposSearchParams } from 'types/repos';
import { getSearchSchema } from 'validators/search';

export const getCachedRepos  = unstable_cache(
  async (params: ReposSearchParams) => {
    console.log('[getCachedRepos] ', JSON.stringify(params));
    return octokit.rest.search.repos(params);
  },
  [],
  { revalidate: 60 }
);

export async function search (previousState: FormState, formData: unknown): Promise<FormState> {
  const t = await getTranslations();
  
  if (!(formData instanceof FormData)) {
    return { isError: true };
  }

  // TODO: add type
  const data = Object.fromEntries(formData as FormData);
  const parsed = getSearchSchema(t).safeParse(data);

  if (!parsed.success) {
    const errors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors)
        .map(([key, value]) => [key, value?.join(', ')])
    );

    return { isError: true, errors };
  }

  const results = await getCachedRepos({ q: data.q })
    .then((res) => res.data)
    .catch(() => []);

  return { isError: false, data: results };
}