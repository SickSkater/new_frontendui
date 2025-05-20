import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";

const PaymentInfoUpdateMutation = createQueryStrLazy(
`
mutation PaymentInfoUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: paymentinfoUpdate(
    paymentinfo: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on PaymentInfoGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...PaymentInfoLarge
      }      
    }
    ...PaymentInfoLarge
  }
}
`, PaymentInfoLargeFragment)

export const PaymentInfoUpdateAsyncAction = createAsyncGraphQLAction(PaymentInfoUpdateMutation)