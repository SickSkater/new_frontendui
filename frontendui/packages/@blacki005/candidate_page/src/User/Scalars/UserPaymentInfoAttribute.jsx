/**
 * A component for displaying the `paymentinfo` attribute of an user entity.
 *
 * This component checks if the `paymentinfo` attribute exists on the `user` object. If `paymentinfo` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `paymentinfo` attribute.
 *
 * @component
 * @param {Object} props - The props for the UserPaymentinfoAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {*} [props.user.paymentinfo] - The paymentinfo attribute of the user entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `paymentinfo` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { paymentinfo: { id: 1, name: "Sample Paymentinfo" } };
 *
 * <UserPaymentinfoAttribute user={userEntity} />
 */

import {PaymentInfoMediumCard} from "C:/Users/vojta/OneDrive/Plocha/new_frontendui/frontendui/packages/@blacki005/candidate_page/src/PaymentInfo/Components/PaymentInfoMediumCard"

export const UserPaymentInfoAttribute = ({paymentinfo}) => {
    return (
        <>
            <PaymentInfoMediumCard paymentinfo = {paymentinfo} />   
        </>
    )
}