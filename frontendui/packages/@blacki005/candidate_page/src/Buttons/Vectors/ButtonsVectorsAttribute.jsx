import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an buttons entity.
 *
 * This component checks if the `vectors` attribute exists on the `buttons` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the ButtonsVectorsAttribute component.
 * @param {Object} props.buttons - The object representing the buttons entity.
 * @param {Array} [props.buttons.vectors] - An array of vectors items associated with the buttons entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const buttonsEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <ButtonsVectorsAttribute buttons={buttonsEntity} />
 */
export const ButtonsVectorsAttribute = ({buttons}) => {
    const { vectors } = buttons
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

const ButtonsVectorsAttributeQuery = `
query ButtonsQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: buttonsById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const ButtonsVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    ButtonsVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const ButtonsVectorsAttributeInifite = ({buttons}) => { 
    const {vectors} = buttons

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={ButtonsVectorsAttributeAsyncAction}
        />
    )
}