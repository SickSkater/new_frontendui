import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an payment entity.
 *
 * This component checks if the `vectors` attribute exists on the `payment` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the PaymentVectorsAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {Array} [props.payment.vectors] - An array of vectors items associated with the payment entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <PaymentVectorsAttribute payment={paymentEntity} />
 */
export const PaymentVectorsAttribute = ({payment}) => {
    const { vectors } = payment
    if (typeof vectors === 'undefined') return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    Probably {'<VectorMediumCard vector=\{vector\} />'} <br />
                    {JSON.stringify(vector)}
                </div>
            )}
        </>
    )
}

const VectorsAttributeQuery = `
query PaymentQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: paymentById(id: $id) {
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

export const PaymentVectorsAttributeInifite = ({payment}) => { 
    const {vectors} = payment

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={VectorsAttributeAsyncAction}
        />
    )
}