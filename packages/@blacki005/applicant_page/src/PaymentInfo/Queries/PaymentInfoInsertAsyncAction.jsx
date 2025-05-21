import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";

const PaymentInfoInsertMutation = createQueryStrLazy(
`
mutation paymentInfoInsert($id: UUID, $accountNumber: String, $specificSymbol: String, $constantSymbol: String, $IBAN: String, $SWIFT: String, $amount: Float) {
  paymentInfoInsert(paymentInfo: {id: $id, accountNumber: $accountNumber, specificSymbol: $specificSymbol, constantSymbol: $constantSymbol, IBAN: $IBAN, SWIFT: $SWIFT, amount: $amount}) {
    ... on PaymentInfoGQLModel { ...PaymentInfoLarge }
    ... on InsertError { 
      failed
      msg
      input
    }
  }
}

`,
    PaymentInfoLargeFragment)


export const PaymentInfoInsertAsyncAction = createAsyncGraphQLAction(PaymentInfoInsertMutation)