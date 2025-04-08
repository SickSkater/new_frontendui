import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ButtonsLargeFragment } from "./ButtonsFragments";

const ButtonsInsertMutation = createQueryStrLazy(
`
mutation ButtonsInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: buttonsInsert(
    buttons: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...ButtonsLarge
  }
}
`,
    ButtonsLargeFragment)


export const ButtonsInsertAsyncAction = createAsyncGraphQLAction(ButtonsInsertMutation)