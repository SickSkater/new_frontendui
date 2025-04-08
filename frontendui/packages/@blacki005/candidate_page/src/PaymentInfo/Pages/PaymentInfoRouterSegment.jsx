import { PaymentInfoURI } from "../Components/PaymentInfoLink"
import { PaymentInfoPage } from "./PaymentInfoPage"

/**
 * A router segment definition for the PaymentInfo page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `PaymentInfoURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} PaymentInfoRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/paymentinfo/paymentinfo/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <PaymentInfoPage />.
 */
export const PaymentInfoRouterSegment = {
    path: `/${PaymentInfoURI}/:id`,
    element: <PaymentInfoPage />,
}