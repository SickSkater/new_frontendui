import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { ButtonsLargeCard } from "../Components"
import { ButtonsReadAsyncAction } from "../Queries"
import { ButtonsPageNavbar } from "./ButtonsPageNavbar"

/**
 * A page content component for displaying detailed information about an buttons entity.
 *
 * This component utilizes `ButtonsLargeCard` to create a structured layout and displays 
 * the serialized representation of the `buttons` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the ButtonsPageContent component.
 * @param {Object} props.buttons - The object representing the buttons entity.
 * @param {string|number} props.buttons.id - The unique identifier for the buttons entity.
 * @param {string} props.buttons.name - The name or label of the buttons entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an buttons entity.
 *
 * @example
 * // Example usage:
 * const buttonsEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ButtonsPageContent buttons={buttonsEntity} />
 */
const ButtonsPageContent = ({buttons}) => {
    return (<>
        <ButtonsPageNavbar buttons={buttons} />
        <ButtonsLargeCard buttons={buttons}>

        </ButtonsLargeCard>
    </>)
}

export const ButtonsPage = () => {
    const {id} = useParams()
    const buttons = {id}
    return <ButtonsPageContent buttons={buttons} />
}

/**
 * A lazy-loading component for displaying content of an buttons entity.
 *
 * This component is created using `createLazyComponent` and wraps `ButtonsPageContent` to provide
 * automatic data fetching for the `buttons` entity. It uses the `ButtonsReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `buttons` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.buttons - The identifier of the buttons entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `buttons` entity data and displays it
 * using `ButtonsPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const buttonsId = "12345";
 *
 * <ButtonsPageContentLazy buttons={buttonsId} />
 */
const ButtonsPageContentLazy = ({buttons}) => {
    const { error, loading, entity, fetch } = useAsyncAction(ButtonsReadAsyncAction, buttons)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <ButtonsPageContent buttons={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an buttons entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `buttons` object, and passes it to the `ButtonsPageContentLazy` component.
 * The `ButtonsPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the buttons entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/buttons/:id" element={<ButtonsPage />} />
 *
 * // Navigating to "/buttons/12345" will render the page for the buttons entity with ID 12345.
 */
