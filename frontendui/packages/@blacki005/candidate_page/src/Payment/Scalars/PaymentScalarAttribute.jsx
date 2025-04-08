/**
 * A component for displaying the `scalar` attribute of an payment entity.
 *
 * This component checks if the `scalar` attribute exists on the `payment` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the PaymentScalarAttribute component.
 * @param {Object} props.payment - The object representing the payment entity.
 * @param {*} [props.payment.scalar] - The scalar attribute of the payment entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const paymentEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <PaymentScalarAttribute payment={paymentEntity} />
 */
export const PaymentScalarAttribute = ({payment}) => {
    const {scalar} = payment
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}