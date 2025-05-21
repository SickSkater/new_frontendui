import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { AdmissionLargeFragment } from "./AdmissionFragments";

const AdmissionInsertMutation = createQueryStrLazy(
`
mutation admissionInsert($programId: UUID!, $id: UUID, $name: String, $nameEn: String, $stateId: UUID, $paymentInfoId: UUID, $applicationStartDate: DateTime, $applicationLastDate: DateTime, $endDate: DateTime, $conditionDate: DateTime, $paymentDate: DateTime, $conditionExtendedDate: DateTime, $requestConditionExtendDate: DateTime, $requestExtraConditionsDate: DateTime, $requestExtraDateDate: DateTime, $examStartDate: DateTime, $examLastDate: DateTime, $studentEntryDate: DateTime) {
  admissionInsert(admission: {programId: $programId, id: $id, name: $name, nameEn: $nameEn, stateId: $stateId, paymentInfoId: $paymentInfoId, applicationStartDate: $applicationStartDate, applicationLastDate: $applicationLastDate, endDate: $endDate, conditionDate: $conditionDate, paymentDate: $paymentDate, conditionExtendedDate: $conditionExtendedDate, requestConditionExtendDate: $requestConditionExtendDate, requestExtraConditionsDate: $requestExtraConditionsDate, requestExtraDateDate: $requestExtraDateDate, examStartDate: $examStartDate, examLastDate: $examLastDate, studentEntryDate: $studentEntryDate}) {
    ... on AdmissionGQLModel { ...AdmissionLarge }
    ... on InsertError {
      failed
      msg
      input
    }
  }
}
`,
    AdmissionLargeFragment)


export const AdmissionInsertAsyncAction = createAsyncGraphQLAction(AdmissionInsertMutation)