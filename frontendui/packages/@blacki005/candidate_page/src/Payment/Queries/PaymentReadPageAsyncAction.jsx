import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentReadPageQuery = createQueryStrLazy(
`
query PaymentReadPageQuery($skip: Int, $limit: Int, $where: PaymentWhereInputFilter) {
  result: paymentPage(skip: $skip, limit: $limit, where: $where) {
    ...PaymentLarge
  }
}
`, 
    PaymentLargeFragment)

export const PaymentReadPageAsyncAction = createAsyncGraphQLAction(PaymentReadPageQuery)