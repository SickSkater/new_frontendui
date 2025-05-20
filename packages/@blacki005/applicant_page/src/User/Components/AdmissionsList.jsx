//komponenta pro zobrazeni seznamu prijmacich rizeni
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared";
import { AdmissionLink } from "../../Admission";
import { AdmissionReadPageAsyncAction } from "../../Admission";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";


const VectorsAttributeQuery = `
query AdmissionQueryRead($id: id, $where: AdmissionInputFilter, $skip: Int, $limit: Int) {
    result: admissionById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const VectorsAttributeAsyncAction = createAsyncGraphQLAction(
    VectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)



export const AdmissionsList = () => {
    if (typeof admissions === 'undefined') return null
    return (
        <InfiniteScroll
            Visualiser={'AdmissionLink'}
            actionParams={{skip: 0, limit: 10}}
            asyncAction={VectorsAttributeAsyncAction}
        />
    )
}