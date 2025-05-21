import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionReadPageQuery = createQueryStrLazy(
`
query admissionPage($skip: Int, $limit: Int, $orderby: String, $where: AdmissionInputFilter) {
  admissionPage(skip: $skip, limit: $limit, orderby: $orderby, where: $where) {
  ...AdmissionLarge
}
}
`, 
    AdmissionLargeFragment)

export const AdmissionReadPageAsyncAction = createAsyncGraphQLAction(AdmissionReadPageQuery)