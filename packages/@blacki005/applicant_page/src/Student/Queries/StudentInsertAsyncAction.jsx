import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentLargeFragment } from "./StudentFragments";

const StudentInsertMutation = createQueryStrLazy(
`
mutation studentInsert(
  $id: UUID,
  $userId: UUID,
  $programId: UUID,
  $stateId: UUID,
  $semesterNumber: Int
) {
  studentInsert(student: {id: $id, userId: $userId, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber}) {
    ... on StudentGQLModel { ...StudentLarge }
    ... on InsertError {
      __typename
      msg
      failed
      input
    }
  }
}
`,
    StudentLargeFragment)


export const StudentInsertAsyncAction = createAsyncGraphQLAction(StudentInsertMutation)