import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { CardCapsule, InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import { AdmissionLink } from "../../Admission"
import { EvaluationLink } from "../../Evaluation"
import { DeleteAdmission } from "../Components/DeleteAdmission"
import { Table } from "react-bootstrap"
import { PaymentLink } from "../../Payment"
import { PaymentStatus } from "../../Payment"

/**
 * A component for displaying the `students` attribute of an user entity.
 *
 * This component checks if the `students` attribute exists on the `user` object. If `students` is undefined or invalid,
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
export const UserStudentsAttribute = ({ studies, user }) => {
    if (typeof studies === 'undefined') return null

    // Filter out students with invalid data
    studies = studies.filter(student =>
        student.id &&
        student.program &&
        student.payments &&
        student.payments?.paymentInfo &&
        student.payments?.paymentInfo?.admission
    )

    if (studies.length === 0) {
        console.log("User with id" + user.id + " has no studies")
        return null
    }

    return (
        <>
            {
                studies.map(
                    student => <div id={student.id} key={student.id} style={{width: "60%", margin: "auto", padding: "10px"}}>
                        <CardCapsule title={`${student.program.name}`}>
                            <Table striped bordered hover size="sm" className="mb-0">
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "10px", width: "30%" }}>
                                            Přihláška:
                                        </td>
                                        <td style={{ padding: "10px", width: "70%" }}>
                                            <AdmissionLink admission={student.payments.paymentInfo.admission} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px", width: "30%" }}>
                                            <EvaluationLink evaluation={student?.evaluations[0]}/>:
                                        </td>
                                        <td style={{ padding: "10px", width: "70%" }}>
                                            Termín: {student?.payments?.paymentInfo?.admission?.examStartDate} - {student?.payments?.paymentInfo?.admission?.examLastDate} <br/> 
                                            Splneno: {student?.evaluations[0]?.passed ? "Ano" : "Ne"} <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px", width: "30%" }}>
                                            <PaymentLink payment={student.payments} />:
                                        </td>
                                        <td style={{ padding: "10px", width: "70%" }}>
                                            <PaymentStatus payment={student.payments} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "10px", width: "30%" }}>
                                            Smazat přihlášku:
                                        </td>
                                        <td style={{ padding: "10px", width: "70%" }}>
                                            <DeleteAdmission student={student} user={user} />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardCapsule>
                    </div >
                )}
        </>
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

export const UserStudentsAttributeInifite = ({ user }) => {
    const { students } = user

    return (
        <InfiniteScroll
            Visualiser={'StudentMediumCard'}
            actionParams={{ skip: 0, limit: 10 }}
            asyncAction={StudentsAttributeAsyncAction}
        />
    )
}