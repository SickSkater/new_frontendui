import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentInsertMutation = createQueryStrLazy(
`
mutation PaymentInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: paymentInsert(
    payment: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...PaymentLarge
  }
}
`,
    PaymentLargeFragment)


export const PaymentInsertAsyncAction = createAsyncGraphQLAction(PaymentInsertMutation)