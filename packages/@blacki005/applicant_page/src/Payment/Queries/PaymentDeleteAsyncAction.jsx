import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentDeleteMutation = createQueryStrLazy(
`
mutation PaymentDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: paymentDelete(
    payment: {id: $id, lastchange: $lastchange}
  ) {
    ... on PaymentGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...PaymentLarge
      }
    }
  }
}
`,
    PaymentLargeFragment)

export const PaymentDeleteAsyncAction = createAsyncGraphQLAction(PaymentDeleteMutation)