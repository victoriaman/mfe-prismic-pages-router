import {
  Route,
  createClient as baseCreateClient,
} from "@prismicio/client";
import {
  enableAutoPreviews,
  type CreateClientConfig,
} from "@prismicio/next/pages";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: Route[] = [
  // Examples:
  // { type: "homepage", path: "/" },
  // { type: "page", path: "/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = ({
  previewData,
  req,
  ...config
}: CreateClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    ...config,
  });

  enableAutoPreviews({ client, previewData, req });

  return client;
};
