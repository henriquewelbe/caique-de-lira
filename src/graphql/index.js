import { gql, GraphQLClient } from 'graphql-request'

const preloader = gql`
  query GetPreloaders {
    preloader {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`

const homepage = gql`
  query GetPreloaders {
    homepage {
      data {
        id
        attributes {
          button
        }
      }
    }
  }
`

const cms = new GraphQLClient('http://localhost:1337/graphql', { headers: { Authorization: 'Bearer bf194d00b41db58c39a23858b9b82ae4689e7bb9844ad8cdf5f85e4e0225254aa51b45176ca8d61115ffb7e4de5c18a0483ca1b0beff403d130a2f4d9b22602aeaaba1c74ca2cf82cde07c54f92962f98e877bc22675f9d032cdc385b0f826613a6ac7130062308b619f8e84cf9f11607dabf1deedc626aa57396632c3330306' } })

async function getPreloader () {
  return cms.request(preloader)
}

async function getHomepage () {
  return cms.request(homepage)
}

export { getPreloader, getHomepage }
