import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { CardCapsule, InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { AdmissionLink } from "../../Admission"
import { EvaluationLink } from "../../Evaluation"
import { PaymentInfoLink } from "../../PaymentInfo"
import {DeleteAdmission} from "../Components/DeleteAdmission"

/**
 * A component for displaying the `students` attribute of an user entity.
 *
 * This component checks if the `students` attribute exists on the `user` object. If `students` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `students` array and
 * displays a placeholder message and a JSON representation for each item in the `students`.
 *
 * @component
 * @param {Object} props - The props for the UserStudentsAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {Array} [props.user.students] - An array of students items associated with the user entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `students` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { 
 *   students: [
 *     { id: 1, name: "Student Item 1" }, 
 *     { id: 2, name: "Student Item 2" }
 *   ] 
 * };
 *
 * <UserStudentsAttribute user={userEntity} />
 */
export const UserStudentsAttribute = ({studies, user}) => {
    if (typeof studies === 'undefined') return null

    // Filter out students that do not have an id, program name, or payment info
    studies = studies.filter(student => 
        student.id && 
        student.program &&
        student.payments &&
        student.payments?.paymentInfo &&
        student.payments?.paymentInfo?.admission
    )
    if (studies.length === 0) return null

    return (
        <>
            {
            studies.map(
                student => <div id={student.id} key={student.id}>
                    <CardCapsule title={`${student.program.name}`}>
                    Přihláška: &emsp;
                    <AdmissionLink admission={student.payments.paymentInfo.admission} />
                    <br/>
                    Zkouška: &emsp;
                    TODO
                    {/* <EvaluationLink evaluation={student.evaluations[0]}/> */}
                    <br/>
                    <PaymentStatus payment={student.payments}/>
                    Zpetvzeti prihlasky: 
                    <DeleteAdmission student={student} user={user}/>
                    </CardCapsule>
                </div>
            )}
        </>
    )
}


/**
 * A functional component that displays the payment status of a student.
 *
 * This component checks if the `payment` object is defined. If it is undefined,
 * the component returns `null` and renders nothing. Otherwise, it determines
 * the payment status based on the `amount` property of the `payment` object.
 * If the `amount` is not zero, the status is set to "zaplaceno" (paid),
 * otherwise it defaults to "nezaplaceno" (unpaid).
 */ 
const PaymentStatus = ({payment}) => {
    if (typeof payment === 'undefined') return null

    var status = "nezaplaceno"
    if (payment.amount != 0) {
        console.log(payment)
        status = "zaplaceno"
    }

    return (
        <div>
                Platba: {status}
        </div>
    )
}

const StudentsAttributeQuery = `
query UserQueryRead($id: id, $where: StudentInputFilter, $skip: Int, $limit: Int) {
    result: userById(id: $id) {
        __typename
        id
        students(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudentsAttributeAsyncAction = createAsyncGraphQLAction(
    StudentsAttributeQuery,
    processVectorAttributeFromGraphQLResult("students")
)

export const UserStudentsAttributeInifite = ({user}) => { 
    const {students} = user

    return (
        <InfiniteScroll 
            Visualiser={'StudentMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudentsAttributeAsyncAction}
        />
    )
}