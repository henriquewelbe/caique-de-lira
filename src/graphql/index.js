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

const cms = new GraphQLClient('https://caique-de-lira.000webhostapp.com/graphql')

async function getHomepage () {
  return cms.request(homepageQuery).then(homepage => homepage.pages.nodes[0].homepage)
}

export { getHomepage }
