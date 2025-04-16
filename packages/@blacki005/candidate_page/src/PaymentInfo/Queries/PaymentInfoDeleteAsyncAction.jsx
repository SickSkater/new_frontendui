import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";

const PaymentInfoDeleteMutation = createQueryStrLazy(
`
mutation PaymentInfoDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: paymentinfoDelete(
    paymentinfo: {id: $id, lastchange: $lastchange}
  ) {
    ... on PaymentInfoGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...PaymentInfoLarge
      }
    }
  }
}
`,
    PaymentInfoLargeFragment)

export const PaymentInfoDeleteAsyncAction = createAsyncGraphQLAction(PaymentInfoDeleteMutation)