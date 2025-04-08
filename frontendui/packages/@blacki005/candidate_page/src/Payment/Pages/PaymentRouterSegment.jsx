import { PaymentURI } from "../Components/PaymentLink"
import { PaymentPage } from "./PaymentPage"

/**
 * A router segment definition for the Payment page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `PaymentURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} PaymentRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/payment/payment/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <PaymentPage />.
 */
export const PaymentRouterSegment = {
    path: `/${PaymentURI}/:id`,
    element: <PaymentPage />,
}