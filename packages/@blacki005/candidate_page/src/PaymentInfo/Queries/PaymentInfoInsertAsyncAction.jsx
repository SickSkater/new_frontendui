import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";

const PaymentInfoInsertMutation = createQueryStrLazy(
`
mutation PaymentInfoInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: paymentinfoInsert(
    paymentinfo: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...PaymentInfoLarge
  }
}
`,
    PaymentInfoLargeFragment)


export const PaymentInfoInsertAsyncAction = createAsyncGraphQLAction(PaymentInfoInsertMutation)