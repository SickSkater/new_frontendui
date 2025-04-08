import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { PaymentInfoLargeCard } from "../Components"
import { PaymentInfoReadAsyncAction } from "../Queries"
import { PaymentInfoPageNavbar } from "./PaymentInfoPageNavbar"
import {PaymentInfoAdmissionAttribute} from "../Scalars/PaymentInfoAdmissionAttribute"

/**
 * A page content component for displaying detailed information about an paymentinfo entity.
 *
 * This component utilizes `PaymentInfoLargeCard` to create a structured layout and displays 
 * the serialized representation of the `paymentinfo` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the PaymentInfoPageContent component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {string|number} props.paymentinfo.id - The unique identifier for the paymentinfo entity.
 * @param {string} props.paymentinfo.name - The name or label of the paymentinfo entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an paymentinfo entity.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentInfoPageContent paymentinfo={paymentinfoEntity} />
 */

const paymentinfo_temp = {
                    "amount": 700,
                    "accountNumber": "1234567890",
                    "specificSymbol": "AB123",
                    "constantSymbol": "XYZ987",
                    "IBAN": "GB29NWBK60161331926819",
                    "SWIFT": "NWBKGB2L"
                }


const PaymentInfoPageContent = ({paymentinfo}) => {
    return (<>
        <PaymentInfoPageNavbar paymentinfo={paymentinfo} />
        <PaymentInfoLargeCard paymentinfo={paymentinfo}>
        </PaymentInfoLargeCard>
    </>)
}

export const PaymentInfoPage = () => {
    const {id} = useParams()
    const paymentinfo = {id}
    return <PaymentInfoPageContent paymentinfo={paymentinfo_temp} />
}

/**
 * A lazy-loading component for displaying content of an paymentinfo entity.
 *
 * This component is created using `createLazyComponent` and wraps `PaymentInfoPageContent` to provide
 * automatic data fetching for the `paymentinfo` entity. It uses the `PaymentInfoReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `paymentinfo` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.paymentinfo - The identifier of the paymentinfo entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `paymentinfo` entity data and displays it
 * using `PaymentInfoPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const paymentinfoId = "12345";
 *
 * <PaymentInfoPageContentLazy paymentinfo={paymentinfoId} />
 */
const PaymentInfoPageContentLazy = ({paymentinfo}) => {
    const { error, loading, entity, fetch } = useAsyncAction(PaymentInfoReadAsyncAction, paymentinfo)
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
        {entity && <PaymentInfoPageContent paymentinfo={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an paymentinfo entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `paymentinfo` object, and passes it to the `PaymentInfoPageContentLazy` component.
 * The `PaymentInfoPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the paymentinfo entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/paymentinfo/:id" element={<PaymentInfoPage />} />
 *
 * // Navigating to "/paymentinfo/12345" will render the page for the paymentinfo entity with ID 12345.
 */
