import type { Endpoints } from '@octokit/types';

export type ReposSearchParams = Endpoints['GET /search/repositories']['parameters'];
export type ReposSearchResponse = Endpoints['GET /search/repositories']['response'];

export type Repo = ReposSearchResponse['data']['items'][number];
