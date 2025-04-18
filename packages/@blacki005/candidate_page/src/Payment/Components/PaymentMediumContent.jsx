/**
 * A component that displays medium-level content for an payment entity.
 *
 * This component renders a label "PaymentMediumContent" followed by a serialized representation of the `payment` object
 * and any additional child content. It is designed to handle and display information about an payment entity object.
 *
 * @component
 * @param {Object} props - The properties for the PaymentMediumContent component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {string|number} props.payment.id - The unique identifier for the payment entity.
 * @param {string} props.payment.name - The name or label of the payment entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `payment` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentMediumContent payment={paymentEntity}>
 *   <p>Additional information about the entity.</p>
 * </PaymentMediumContent>
 */
export const PaymentMediumContent = ({payment, children}) => {
    return (
        <>
            PaymentMediumContent <br />
            {JSON.stringify(payment)}
            {children}
        </>
    )
}
