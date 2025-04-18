import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { SemesterLink } from "./SemesterLink"

/**
 * A component that displays medium-level content for an semester entity.
 *
 * This component renders a label "SemesterMediumContent" followed by a serialized representation of the `semester` object
 * and any additional child content. It is designed to handle and display information about an semester entity object.
 *
 * @component
 * @param {Object} props - The properties for the SemesterMediumContent component.
 * @param {Object} props.semester - The object representing the semester entity.
 * @param {string|number} props.semester.id - The unique identifier for the semester entity.
 * @param {string} props.semester.name - The name or label of the semester entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `semester` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const semesterEntity = { id: 123, name: "Sample Entity" };
 * 
 * <SemesterMediumContent semester={semesterEntity}>
 *   <p>Additional information about the entity.</p>
 * </SemesterMediumContent>
 */
export const SemesterMediumContent = ({semester, children}) => {
    return (
        <>
            SemesterMediumContent <br />
            {JSON.stringify(semester)}
            {children}
        </>
    )
}
