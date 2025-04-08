import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentUpdateMutation = createQueryStrLazy(
`
mutation PaymentUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: paymentUpdate(
    payment: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on PaymentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...PaymentLarge
      }      
    }
    ...PaymentLarge
  }
}
`, PaymentLargeFragment)

export const PaymentUpdateAsyncAction = createAsyncGraphQLAction(PaymentUpdateMutation)