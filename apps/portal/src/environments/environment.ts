// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  port: 4200,
  apiUrl: "https://192.168.100.8/api/v1/",
  graphqlUrl: "http://192.168.100.8/graphql",
  cdnUrl: "https://cdn.mytribes.ru",
  cdn2Url: "https://cdn2.mytribes.ru",
  cdnBucket: "cdn.mytribes.ru",
  staticAssetsUrl: "assets/"
};
