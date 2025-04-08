import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ButtonsLargeFragment } from "./ButtonsFragments";

const ButtonsReadPageQuery = createQueryStrLazy(
`
query ButtonsReadPageQuery($skip: Int, $limit: Int, $where: ButtonsWhereInputFilter) {
  result: buttonsPage(skip: $skip, limit: $limit, where: $where) {
    ...ButtonsLarge
  }
}
`, 
    ButtonsLargeFragment)

export const ButtonsReadPageAsyncAction = createAsyncGraphQLAction(ButtonsReadPageQuery)