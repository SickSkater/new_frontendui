import { Table } from "react-bootstrap"
import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { CardCapsule, InfiniteScroll } from "@hrbolek/uoisfrontend-shared"
import {
    AdmissionLink,
    EvaluationLink,
    DeleteApplicationButton,
    PaymentStatus
} from "@blacki005/applicant_page"
import styles from "./UserStudentsAttribute.module.css";

/**
 * A component for displaying the `students` attribute of an user entity.
 */
export const UserStudentsAttribute = ({ studies, user, editable }) => {
    if (typeof studies === 'undefined') return null

    // Filter out students with invalid data
    const filteredStudies = studies.filter(student =>
        student.id &&
        student.program &&
        student.payments &&
        student.payments?.paymentInfo &&
        student.payments?.paymentInfo?.admission
    )

    if (filteredStudies.length === 0) {
        return null
    }

    return (
        <>
            {filteredStudies.map(student =>
                <div id={student.id} key={student.id} className={styles.studentCardWrapper}>
                    <CardCapsule title={`${student.program.name}`}>
                        <Table striped bordered hover className={styles.studentTable}>
                            <tbody>
                                <tr>
                                    <td>
                                        Přihláška:
                                    </td>
                                    <td>
                                        <AdmissionLink admission={student.payments.paymentInfo.admission} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Výsledky:
                                    </td>
                                    <td>
                                        <EvaluationLink evaluation={student?.evaluations[0]} /><br />
                                        Termín: {student?.payments?.paymentInfo?.admission?.examStartDate} - {student?.payments?.paymentInfo?.admission?.examLastDate} <br />
                                        Splneno: {student?.evaluations[0]?.passed ? "Ano" : "Ne"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Platba:
                                    </td>
                                    <td className={student.payments?.status === "paid" ? styles.paid : styles.unpaid}>
                                        <PaymentStatus payment={student.payments} />
                                    </td>
                                </tr>
                                {editable ?
                                    <tr>
                                        <td>
                                            Smazat přihlášku:
                                        </td>
                                        <td>
                                            <DeleteApplicationButton student={student} user={user}/>
                                        </td>
                                    </tr>
                                    :
                                    <></>
                                }
                            </tbody>
                        </Table>
                    </CardCapsule>
                </div>
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