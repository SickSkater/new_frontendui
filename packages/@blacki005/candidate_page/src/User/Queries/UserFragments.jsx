import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const UserLinkFragment = createQueryStrLazy(
`
fragment UserLink on UserGQLModel {
  __typename
  id
  fullname
}
`)


export const UserMediumFragment = createQueryStrLazy(
`
fragment UserMedium on UserGQLModel {
  ...UserLink
  __typename
  id
  name
}
`, UserLinkFragment)

export const UserLargeFragment = createQueryStrLazy(
`
fragment UserLarge on UserGQLModel {
  ...UserMedium
  __typename
  id
  name
  surname
  studies {
    payments {
      paymentInfo {
        amount
        admission {
          id
          program {
            name
          }
        }
      }
    }
  }
}
`, UserMediumFragment)
  