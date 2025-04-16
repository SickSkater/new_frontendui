import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `paymentinfos` attribute of an admission entity.
 *
 * This component checks if the `paymentinfos` attribute exists on the `admission` object. If `paymentinfos` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `paymentinfos` array and
 * displays a placeholder message and a JSON representation for each item in the `paymentinfos`.
 *
 * @component
 * @param {Object} props - The props for the AdmissionPaymentinfosAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {Array} [props.admission.paymentinfos] - An array of paymentinfos items associated with the admission entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `paymentinfos` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { 
 *   paymentinfos: [
 *     { id: 1, name: "Paymentinfo Item 1" }, 
 *     { id: 2, name: "Paymentinfo Item 2" }
 *   ] 
 * };
 *
 * <AdmissionPaymentinfosAttribute admission={admissionEntity} />
 */

import { getDataById, temp_data } from "../../User"
import { PaymentInfoLink } from "../../PaymentInfo"
export const AdmissionPaymentInfosAttribute = ({payment_info}) => {
    console.log(payment_info)
    const { paymentinfos } = payment_info
    //if (typeof paymentinfos === 'undefined') return null
    return (
        console.log(paymentinfos),
        <>
            {paymentinfos.map(
                payment => <div id={payment.id} key={payment.id}>
                    <PaymentInfoLink paymentinfo={payment.payments[0].paymentinfo}/>
                    {JSON.stringify(payment)}
                </div>
            )}
        </>
    )
}

const PaymentinfosAttributeQuery = `
query AdmissionQueryRead($id: id, $where: PaymentinfoInputFilter, $skip: Int, $limit: Int) {
    result: admissionById(id: $id) {
        __typename
        id
        paymentinfos(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const PaymentinfosAttributeAsyncAction = createAsyncGraphQLAction(
    PaymentinfosAttributeQuery,
    processVectorAttributeFromGraphQLResult("paymentinfos")
)

export const AdmissionPaymentinfosAttributeInifite = ({admission}) => { 
    const {paymentinfos} = admission

    return (
        <InfiniteScroll 
            Visualiser={'PaymentinfoMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={PaymentinfosAttributeAsyncAction}
        />
    )
}