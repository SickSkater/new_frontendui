import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentInsertMutation = createQueryStrLazy(
`
mutation paymentInsert(
  $id: UUID,
  $studentId: UUID,
  $programId: UUID,
  $bankUniqueData: String,
  $variableSymbol: String,
  $amount: Float,
  $paymentInfoId: UUID
) {
  paymentInsert(payment: {id: $id, studentId: $studentId, programId: $programId, bankUniqueData: $bankUniqueData, variableSymbol: $variableSymbol, amount: $amount, paymentInfoId: $paymentInfoId}) {
    ... on PaymentGQLModel { ...PaymentLarge }
    ... on InsertError {
      __typename
      msg
      failed
      input
    }
  }
}
`,
    PaymentLargeFragment)


export const PaymentInsertAsyncAction = createAsyncGraphQLAction(PaymentInsertMutation)