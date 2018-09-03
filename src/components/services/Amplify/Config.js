//remember => create a user pool whithout Secret key
const identityPoolId = "us-east-1:5f409d19-f00a-4b4e-918c-1b167c69c1c5"
const region = "us-east-1"
const userPoolId = "us-east-1_SG48IM6g4"
const userPoolWebClientId = "sgev76l9e05767091f7oo4ib"


//Api
const aws_appsync_graphqlEndpoint = "https://nzdg2lrjgjeulmso3uwf7bifbu.appsync-api.us-east-1.amazonaws.com/graphql"
const aws_appsync_authenticationType= 'AMAZON_COGNITO_USER_POOLS'


const AuthConfig = {
        identityPoolId,
        region,
        userPoolId,
        userPoolWebClientId,
   }



const ApiConfig = {
    aws_appsync_graphqlEndpoint,
    region,
    aws_appsync_authenticationType
}


const Config = {
    Auth: AuthConfig,
    Api: ApiConfig
}


export {
    Config
}