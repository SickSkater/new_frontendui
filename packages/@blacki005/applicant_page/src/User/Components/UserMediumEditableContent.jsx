import { Table } from "react-bootstrap"
import React from "react";
import {
    SearchAdmissions,
    AdmissionsList
 } from "@blacki005/applicant_page";
 import styles from "./userMediumEditableContent.module.css"

/**
 * A component that displays medium-level content for an user entity.
 *
 * This component renders a label "UserMediumContent" followed by a serialized representation of the `user` object
 * and any additional child content. It is designed to handle and display information about an user entity object.
 *
 * @component
 * @param {Object} props - The properties for the UserMediumContent component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The name or label of the user entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `user` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 * 
 * <UserMediumContent user={userEntity}>
 *   <p>Additional information about the entity.</p>
 * </UserMediumContent>
 */
export const UserMediumEditableContent = ({ user, children }) => {
    return (
        <div className = {styles.user_medium_editable_container}>
            <Table className={styles.tableContainer} >
                <tbody>
                    <tr>
                        <td >
                            ID:
                        </td>
                        <td >
                            {user.id}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Jméno:
                        </td>
                        <td >
                            {user.name}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Příjmení:
                        </td>
                        <td >
                            {user.surname}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Email:
                        </td>
                        <td >
                            {user.email}
                        </td>
                    </tr>
                    {user.studies.map((study) => (
                        <tr key={study.id}>
                            <td >
                                Přihláška:
                            </td>
                            <td >
                                {study.program.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Table striped bordered hover className={styles.tableContainer2}>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.searchAdmissionsContainer} colSpan={2}>
                            <SearchAdmissions user={user} editable={true}/>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <AdmissionsList user={user} editable={true} />
        </div>
    );
}

