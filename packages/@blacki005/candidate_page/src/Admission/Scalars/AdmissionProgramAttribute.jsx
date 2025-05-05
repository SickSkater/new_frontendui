/**
 * A component for displaying the `program` attribute of an admission entity.
 *
 * This component checks if the `program` attribute exists on the `admission` object. If `program` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `program` attribute.
 *
 * @component
 * @param {Object} props - The props for the AdmissionProgramAttribute component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {*} [props.admission.program] - The program attribute of the admission entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `program` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { program: { id: 1, name: "Sample Program" } };
 *
 * <AdmissionProgramAttribute admission={admissionEntity} />
 */
import {ProgramMediumCard} from "../../Program"

export const AdmissionProgramAttribute = ({program}) => {
    if (typeof program === 'undefined') return null
    return (
        <>
            {/* <ProgramMediumCard program={program} /> <br />
            {JSON.stringify(program)} */}
            {program.name}
        </>
    )
}