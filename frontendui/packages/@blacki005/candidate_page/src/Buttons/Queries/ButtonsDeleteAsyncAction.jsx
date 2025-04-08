import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ButtonsLargeFragment } from "./ButtonsFragments";

const ButtonsDeleteMutation = createQueryStrLazy(
`
mutation ButtonsDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: buttonsDelete(
    buttons: {id: $id, lastchange: $lastchange}
  ) {
    ... on ButtonsGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...ButtonsLarge
      }
    }
  }
}
`,
    ButtonsLargeFragment)

export const ButtonsDeleteAsyncAction = createAsyncGraphQLAction(ButtonsDeleteMutation)