import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const ButtonsLinkFragment = createQueryStrLazy(
`
fragment ButtonsLink on ButtonsGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const ButtonsMediumFragment = createQueryStrLazy(
`
fragment ButtonsMedium on ButtonsGQLModel {
  ...ButtonsLink
}
`, ButtonsLinkFragment)

export const ButtonsLargeFragment = createQueryStrLazy(
`
fragment ButtonsLarge on ButtonsGQLModel {
  ...ButtonsMedium
}
`, ButtonsMediumFragment)
  