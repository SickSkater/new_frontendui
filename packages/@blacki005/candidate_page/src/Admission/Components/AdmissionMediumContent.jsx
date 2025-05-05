import { AdmissionProgramAttribute } from "../Scalars/AdmissionProgramAttribute"

/**
 * A component that displays medium-level content for an admission entity.
 *
 * This component renders a label "AdmissionMediumContent" followed by a serialized representation of the `admission` object
 * and any additional child content. It is designed to handle and display information about an admission entity object.
 *
 * @component
 * @param {Object} props - The properties for the AdmissionMediumContent component.
 * @param {Object} props.admission - The object representing the admission entity.
 * @param {string|number} props.admission.id - The unique identifier for the admission entity.
 * @param {string} props.admission.name - The name or label of the admission entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `admission` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const admissionEntity = { id: 123, name: "Sample Entity" };
 * 
 * <AdmissionMediumContent admission={admissionEntity}>
 *   <p>Additional information about the entity.</p>
 * </AdmissionMediumContent>
 */
export const AdmissionMediumContent = ({admission, children}) => {
    return (
        <>
            id: {admission.id}
            <br/>
            lastchange: {admission.lastchange}
            <br/>
            Datum zahájení podávání přihlášek: {admission.applicationStartDate}
            <br />
            Datum ukončení podávání přihlášek: {admission.applicationLastDate}
            <br/>
            Datum splnění podmínek: {admission.conditionDate}
            <br/>
            Datum platby: {admission.paymentDate}
            <br/>
            Datum nástupu do studia: {admission.studentEntryDate}
            <br/>
            Datum zahájení zkoušek: {admission.examStartDate}
            <br/>
            Datum ukončení zkoušek: {admission.examLastDate}
            <br/>
            Datum ukončení programu: {admission.endDate}
            <br/>
            Studijní program: <AdmissionProgramAttribute program={admission.program}/>
            
        </>
    )
}
