import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig()
console.log(config)

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: config.authSecret,
  providers: [
    GithubProvider.default({
      clientId: config.clientId,
      clientSecret: config.clientSecret
    })
  ]
})