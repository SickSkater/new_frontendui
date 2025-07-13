import { ProxyLink } from "@hrbolek/uoisfrontend-shared"
export const PaymentInfoURI = '/paymentinfo/';

/**
 * A React component that renders a `ProxyLink` to an "paymentinfo" entity's view page.
 *
 * The target URL is dynamically constructed using the `paymentinfo` object's `id`, and the link displays
 * the `paymentinfo` object's `name` as its clickable content.
 *
 * @function PaymentInfoLink
 * @param {Object} props - The properties for the `PaymentInfoLink` component.
 * @param {Object} props.paymentinfo - The object representing the "paymentinfo" entity.
 * @param {string|number} props.paymentinfo.id - The unique identifier for the "paymentinfo" entity. Used to construct the target URL.
 * @param {string} props.paymentinfo.name - The display name for the "paymentinfo" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "paymentinfo" entity's view page.
 *
 * @example
 * // Example usage with a sample paymentinfo entity:
 * const paymentinfoEntity = { id: 123, name: "Example PaymentInfo Entity" };
 * 
 * <PaymentInfoLink paymentinfo={paymentinfoEntity} />
 * // Renders: <ProxyLink to="/paymentinfo/paymentinfo/view/123">Example PaymentInfo Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/paymentinfo/paymentinfo/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const PaymentInfoLink = ({paymentinfo}) => {
    return <ProxyLink to={PaymentInfoURI + paymentinfo.id}>platba</ProxyLink>
}