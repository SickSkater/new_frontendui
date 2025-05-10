import { PaymentInfoLink } from "../../PaymentInfo"

/**
* A component for displaying the payment status of a student.
 *
 * This component checks if the `payment` prop is defined. If it is undefined, the component returns `Platba nenalezna!`.
 * It determines the payment status based on the `amount` property of the `payment` object. If the amount is greater or equal
 * than amount in PaymentInfo, the status is considered "zaplaceno" (paid). Otherwise, it displays "nezaplaceno" (unpaid) along with a link
 * to the payment information.
 *
 * @component
 * @param {Object} props - The props for the PaymentStatus component.
 * @param {Object} props.payment - The payment object containing payment details.
 * @param {number} props.payment.amount - The amount paid. A value greater or equal to amount in PaymentInfo means payment is completed.
 * @param {Object} props.payment.paymentInfo - The payment information object.
 *
 * @returns {JSX.Element} A JSX element displaying the payment status.
 *
 * @example
 * // Example usage:
 * const payment = {
 *   amount: 100,
 *   paymentInfo: { id: 1, amount: 100, details: "Payment details" }
 * };
 *
 * <PaymentStatus payment={payment} />
 */
export const PaymentStatus = ({ payment }) => {
    if (typeof payment === 'undefined') return <div>Platba nenalezena!</div>

    var status = "nezaplaceno"
    if (payment.amount >= payment.paymentInfo.amount) {
        console.log(payment)
        status = "zaplaceno"
    }

    return (
        <div>
            {payment.amount > 0
                ? "zaplaceno" 
                : 
                <div>
                    Nezaplaceno:&nbsp; 
                    <PaymentInfoLink paymentinfo={payment.paymentInfo} />
                </div>
            }
        </div>
    )
}
