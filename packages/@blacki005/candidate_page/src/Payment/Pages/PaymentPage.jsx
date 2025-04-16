import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { PaymentLargeCard } from "../Components"
import { PaymentReadAsyncAction } from "../Queries"
import { PaymentPageNavbar } from "./PaymentPageNavbar"

/**
 * A page content component for displaying detailed information about an payment entity.
 *
 * This component utilizes `PaymentLargeCard` to create a structured layout and displays 
 * the serialized representation of the `payment` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the PaymentPageContent component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {string|number} props.payment.id - The unique identifier for the payment entity.
 * @param {string} props.payment.name - The name or label of the payment entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an payment entity.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentPageContent payment={paymentEntity} />
 */
const PaymentPageContent = ({payment}) => {
    return (<>
        <PaymentPageNavbar payment={payment} />
        <PaymentLargeCard payment={payment}>
            Payment {JSON.stringify(payment)}
        </PaymentLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an payment entity.
 *
 * This component is created using `createLazyComponent` and wraps `PaymentPageContent` to provide
 * automatic data fetching for the `payment` entity. It uses the `PaymentReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `payment` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.payment - The identifier of the payment entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `payment` entity data and displays it
 * using `PaymentPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const paymentId = "12345";
 *
 * <PaymentPageContentLazy payment={paymentId} />
 */
const PaymentPageContentLazy = ({payment}) => {
    const { error, loading, entity, fetch } = useAsyncAction(PaymentReadAsyncAction, payment)
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
        {entity && <PaymentPageContent payment={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an payment entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `payment` object, and passes it to the `PaymentPageContentLazy` component.
 * The `PaymentPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the payment entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/payment/:id" element={<PaymentPage />} />
 *
 * // Navigating to "/payment/12345" will render the page for the payment entity with ID 12345.
 */
export const PaymentPage = () => {
    const {id} = useParams()
    const payment = {id}
    return <PaymentPageContentLazy payment={payment} />
}