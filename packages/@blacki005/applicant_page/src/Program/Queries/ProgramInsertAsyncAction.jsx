import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { ProgramLargeFragment } from "./ProgramFragments";

const ProgramInsertMutation = createQueryStrLazy(
`
mutation programInsert($id: UUID, $name: String, $nameEn: String, $groupId: UUID, $licencedGroupId: UUID, $typeId: UUID) {
  programInsert(program: {id: $id, name: $name, nameEn: $nameEn, groupId: $groupId, licencedGroupId: $licencedGroupId, typeId: $typeId}) {
    ... on ProgramGQLModel { ...ProgramLarge }
    ... on InsertError {
      failed
      msg
      input
    }
  }
}
`,
    ProgramLargeFragment)


export const ProgramInsertAsyncAction = createAsyncGraphQLAction(ProgramInsertMutation)