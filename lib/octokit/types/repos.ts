import {
  RestEndpointMethodTypes,
} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';

export type ReposSearchParams = typeof RestEndpointMethodTypes['search']['repos']['parameters'];

// TODO: extend type
export type Repo = unknown;
