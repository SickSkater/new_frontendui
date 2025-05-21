import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const PaymentInfoLinkFragment = createQueryStrLazy(
`
fragment PaymentInfoLink on PaymentInfoGQLModel {
  __typename
  id
  amount
  IBAN
  SWIFT
  accountNumber
  specificSymbol
  constantSymbol
}
`)


export const PaymentInfoMediumFragment = createQueryStrLazy(
`
fragment PaymentInfoMedium on PaymentInfoGQLModel {
  ...PaymentInfoLink
}
`, PaymentInfoLinkFragment)

export const PaymentInfoLargeFragment = createQueryStrLazy(
`
fragment PaymentInfoLarge on PaymentInfoGQLModel {
  ...PaymentInfoMedium
  admission {
    __typename
    id
  }
}
`, PaymentInfoMediumFragment)
  