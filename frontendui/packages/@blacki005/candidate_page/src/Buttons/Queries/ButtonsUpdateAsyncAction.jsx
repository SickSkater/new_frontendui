import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ButtonsLargeFragment } from "./ButtonsFragments";

const ButtonsUpdateMutation = createQueryStrLazy(
`
mutation ButtonsUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: buttonsUpdate(
    buttons: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on ButtonsGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...ButtonsLarge
      }      
    }
    ...ButtonsLarge
  }
}
`, ButtonsLargeFragment)

export const ButtonsUpdateAsyncAction = createAsyncGraphQLAction(ButtonsUpdateMutation)