import { gql, GraphQLClient } from 'graphql-request'

const homepageQuery = gql`
query Homepage {
  pages {
    nodes {
      homepage {
        title
      }
    }
  }
}
`

const cms = new GraphQLClient('http://caique-de-lira.local/graphql')

async function getHomepage () {
  return cms.request(homepageQuery).then(homepage => homepage.pages.nodes[0].homepage)
}

export { getHomepage }
