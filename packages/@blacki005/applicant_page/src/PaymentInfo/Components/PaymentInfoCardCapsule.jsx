import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { PaymentInfoLink } from "./PaymentInfoLink"

/**
 * A specialized card component that displays an `PaymentInfoLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `PaymentInfoLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `paymentinfo` object.
 *
 * @component
 * @param {Object} props - The props for the PaymentInfoCardCapsule component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {string|number} props.paymentinfo.id - The unique identifier for the paymentinfo entity.
 * @param {string} props.paymentinfo.name - The display name for the paymentinfo entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { PaymentInfoCardCapsule } from './PaymentInfoCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const paymentinfoEntity = { id: 123, name: "Example Entity" };
 *
 * <PaymentInfoCardCapsule paymentinfo={paymentinfoEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </PaymentInfoCardCapsule>
 */
export const PaymentInfoCardCapsule = ({paymentinfo, children, title="Platební údaje"}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
