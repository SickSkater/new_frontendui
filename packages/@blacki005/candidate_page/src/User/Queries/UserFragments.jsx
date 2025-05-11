import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const UserLinkFragment = createQueryStrLazy(
`
fragment UserLink on UserGQLModel {
  __typename
  id
  name
  surname
}
`)


export const UserMediumFragment = createQueryStrLazy(
`
fragment UserMedium on UserGQLModel {
  ...UserLink
  __typename
  id
  lastchange
  name
  surname
  email
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
  lastchange
    studies {
    __typename
    id
    lastchange
    program {
      __typename
      id
      name
    }
    evaluations {
      __typename
      id
      points
      passed
    }
    student {
      __typename
      id
      lastchange
      name
      surname
      email
    }
    payments {
      __typename
      id
      amount
      lastchange
      created
      bankUniqueData
      variableSymbol
      paymentInfo {
        __typename
        id
        lastchange
        accountNumber
        specificSymbol
        constantSymbol
        IBAN
        SWIFT
        amount
        admission {
          __typename
          id
          lastchange
          name
          applicationStartDate
          applicationLastDate
          endDate
          conditionDate
          paymentDate
          conditionExtendedDate
          requestConditionExtendDate
          requestExtraConditionsDate
          requestExtraDateDate
          examStartDate
          examLastDate
          studentEntryDate
          program {
            __typename
            id
            name
          }
        }
      }
    }
  }
}
`, UserMediumFragment)