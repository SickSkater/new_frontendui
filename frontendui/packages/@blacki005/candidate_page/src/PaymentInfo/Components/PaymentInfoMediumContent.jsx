/**
 * A component that displays medium-level content for an paymentinfo entity.
 *
 * This component renders a label "PaymentInfoMediumContent" followed by a serialized representation of the `paymentinfo` object
 * and any additional child content. It is designed to handle and display information about an paymentinfo entity object.
 *
 * @component
 * @param {Object} props - The properties for the PaymentInfoMediumContent component.
 * @param {Object} props.paymentinfo - The object representing the paymentinfo entity.
 * @param {string|number} props.paymentinfo.id - The unique identifier for the paymentinfo entity.
 * @param {string} props.paymentinfo.name - The name or label of the paymentinfo entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `paymentinfo` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const paymentinfoEntity = { id: 123, name: "Sample Entity" };
 * 
 * <PaymentInfoMediumContent paymentinfo={paymentinfoEntity}>
 *   <p>Additional information about the entity.</p>
 * </PaymentInfoMediumContent>
 */
export const PaymentInfoMediumContent = ({paymentinfo}) => {
    return (
        <>
            Částka: {paymentinfo.amount}
            <br />
            Číslo účtu: {paymentinfo.accountNumber}
            <br/>
            variabilní symbol: {paymentinfo.specificSymbol}
            <br/>
            konstantní symbol: {paymentinfo.constantSymbol}
            <br/>
            IBAN: {paymentinfo.IBAN}
            <br/>
            SWIFT: {paymentinfo.SWIFT}
        </>
    )
}
