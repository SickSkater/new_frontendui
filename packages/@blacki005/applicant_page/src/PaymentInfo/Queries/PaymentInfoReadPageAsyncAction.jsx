import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentInfoLargeFragment } from "./PaymentInfoFragments";

const PaymentInfoReadPageQuery = createQueryStrLazy(
`
query PaymentInfoReadPageQuery($skip: Int, $limit: Int, $where: PaymentInfoWhereInputFilter) {
  result: paymentinfoPage(skip: $skip, limit: $limit, where: $where) {
    ...PaymentInfoLarge
  }
}
`, 
    PaymentInfoLargeFragment)

export const PaymentInfoReadPageAsyncAction = createAsyncGraphQLAction(PaymentInfoReadPageQuery)