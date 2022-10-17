// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'md8vxqjz36'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-zx4184or.us.auth0.com',            // Auth0 domain
  clientId: 'd9XmwA8IspnndsSJ8TphKLRkg6fAcQio',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
