import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const PaymentLinkFragment = createQueryStrLazy(
`
fragment PaymentLink on PaymentGQLModel {
  __typename
  id
  lastchange
  student {
    student {
      name
      surname
    }
  }
  paymentInfo {
    admission {
      name
    }
  }
}
`)


export const PaymentMediumFragment = createQueryStrLazy(
`
fragment PaymentMedium on PaymentGQLModel {
  ...PaymentLink
}
`, PaymentLinkFragment)

export const PaymentLargeFragment = createQueryStrLazy(
`
fragment PaymentLarge on PaymentGQLModel {
  ...PaymentMedium
}
`, PaymentMediumFragment)
  