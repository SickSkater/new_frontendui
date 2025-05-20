import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `evaluations` attribute of an admission entity.
 *
 * This component checks if the `evaluations` attribute exists on the `admission` object. If `evaluations` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `evaluations` array and
 * displays a placeholder message and a JSON representation for each item in the `evaluations`.
 *
 * @component
 * @param {Object} props - The props for the AdmissionEvaluationsAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {Array} [props.admission.evaluations] - An array of evaluations items associated with the admission entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `evaluations` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { 
 *   evaluations: [
 *     { id: 1, name: "Evaluation Item 1" }, 
 *     { id: 2, name: "Evaluation Item 2" }
 *   ] 
 * };
 *
 * <AdmissionEvaluationsAttribute admission={admissionEntity} />
 */
export const AdmissionEvaluationsAttribute = ({admission}) => {
    const { evaluations } = admission
    if (typeof evaluations === 'undefined') return null
    return (
        <>
            {evaluations.map(
                evaluation => <div id={evaluation.id} key={evaluation.id}>
                    Probably {'<EvaluationMediumCard evaluation=\{evaluation\} />'} <br />
                    {JSON.stringify(evaluation)}
                </div>
            )}
        </>
    )
}

const EvaluationsAttributeQuery = `
query AdmissionQueryRead($id: id, $where: EvaluationInputFilter, $skip: Int, $limit: Int) {
    result: admissionById(id: $id) {
        __typename
        id
        evaluations(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const EvaluationsAttributeAsyncAction = createAsyncGraphQLAction(
    EvaluationsAttributeQuery,
    processVectorAttributeFromGraphQLResult("evaluations")
)

export const AdmissionEvaluationsAttributeInifite = ({admission}) => { 
    const {evaluations} = admission

    return (
        <InfiniteScroll 
            Visualiser={'EvaluationMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={EvaluationsAttributeAsyncAction}
        />
    )
}