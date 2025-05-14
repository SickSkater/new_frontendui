import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { EvaluationLargeFragment } from "./EvaluationFragments";

const EvaluationInsertMutation = createQueryStrLazy(
`
mutation EvaluationInsertMutation(
  $id: UUID,
  $semesterId: UUID, 
  $userId: UUID, 
  $order: Int, 
  $points: Int, 
  $passed: Boolean, 
  $description: String, 
  $grade: String, 
  $classificationlevelId: UUID, 
  $classificationplanId: UUID, 
  $eventId: UUID, 
  $parentId: UUID, 
  $studentId: UUID, 
  $examinerId: UUID, 
  $examId: UUID
) {
  result: evaluationInsert(
    evaluation: {id: $id, semesterId: $semesterId, userId: $userId, order: $order, points: $points, passed: $passed, description: $description, grade: $grade, classificationlevelId: $classificationlevelId, classificationplanId: $classificationplanId, eventId: $eventId, parentId: $parentId, studentId: $studentId, examinerId: $examinerId, examId: $examId}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...EvaluationLarge
  }
}
`,
    EvaluationLargeFragment)


export const EvaluationInsertAsyncAction = createAsyncGraphQLAction(EvaluationInsertMutation)