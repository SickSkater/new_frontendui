import { SearchAdmissions } from "./SearchAdmissions";
import { Table } from "react-bootstrap"
import React from "react";

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
import { DataGenerator } from "./DataGenerator";
import { AdmissionsList } from "./AdmissionsList";
export const UserMediumContent = ({ user, children }) => {
    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <Table striped bordered hover style={{ marginBottom: 16, tableLayout: "fixed", width: "100%" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "40%", wordBreak: "break-word" }}>
                            ID:
                        </td>
                        <td style={{ width: "60%", wordBreak: "break-word" }}>
                            {user.id}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "40%", wordBreak: "break-word" }}>
                            Jméno:
                        </td>
                        <td style={{ width: "60%", wordBreak: "break-word" }}>
                            {user.name}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "40%", wordBreak: "break-word" }}>
                            Příjmení:
                        </td>
                        <td style={{ width: "60%", wordBreak: "break-word" }}>
                            {user.surname}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: "40%", wordBreak: "break-word" }}>
                            Email:
                        </td>
                        <td style={{ width: "60%", wordBreak: "break-word" }}>
                            {user.email}
                        </td>
                    </tr>
                    {user.studies.map((study) => (
                        <tr key={study.id}>
                            <td style={{ width: "40%", wordBreak: "break-word" }}>
                                Přihláška:
                            </td>
                            <td style={{ width: "60%", wordBreak: "break-word" }}>
                                {study.program.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Table striped bordered hover style={{ tableLayout: "fixed", width: "100%", marginBottom: 0 }}>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: 8 }} colSpan={2}>
                            <SearchAdmissions user={user} />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <AdmissionsList user={user} />
        </div>
    );
}

