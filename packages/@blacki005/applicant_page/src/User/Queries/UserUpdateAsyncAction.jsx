import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserUpdateMutation = createQueryStrLazy(
`
mutation UserUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $email: String) {
  result: userUpdate(
    user: {id: $id, lastchange: $lastchange, name: $name, email: $email}
  ) {
    ... on UserGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...UserLarge
      }      
    }
    ...UserLarge
  }
}
`, UserLargeFragment)

export const UserUpdateAsyncAction = createAsyncGraphQLAction(UserUpdateMutation)