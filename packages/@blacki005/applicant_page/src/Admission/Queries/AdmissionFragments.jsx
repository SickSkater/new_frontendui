import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const AdmissionLinkFragment = createQueryStrLazy(
`
fragment AdmissionLink on AdmissionGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const AdmissionMediumFragment = createQueryStrLazy(
`
fragment AdmissionMedium on AdmissionGQLModel {
  ...AdmissionLink
  __typename
  id
}
`, AdmissionLinkFragment)

export const AdmissionLargeFragment = createQueryStrLazy(
`
fragment AdmissionLarge on AdmissionGQLModel {
  ...AdmissionMedium
  __typename
  id
  lastchange
  name
  applicationStartDate
  applicationLastDate
  endDate
  conditionDate
  paymentDate
  conditionExtendedDate
  requestConditionExtendDate
  requestExtraConditionsDate
  requestExtraDateDate
  examStartDate
  examLastDate
  studentEntryDate
  program {
    __typename
    id
    name
    nameEn
  }
  paymentInfo {
    __typename
    id
  }
}
`, AdmissionMediumFragment)
  