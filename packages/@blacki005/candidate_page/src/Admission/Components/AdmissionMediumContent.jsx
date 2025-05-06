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
        <Table responsive bordered hover striped > 
        <tbody>
            <tr>
                <th>
                Datum zahájení podávání přihlášek:
                </th>
                <th>
                {admission.applicationStartDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum ukončení podávání přihlášek: 
                </th>
                <th>
                {admission.applicationLastDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum splnění podmínek: 
                </th>
                <th>
                {admission.conditionDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum platby:               
                 </th>
                <th>
                {admission.paymentDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum nástupu do studia:
                </th>
                <th>
                {admission.studentEntryDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum zahájení zkoušek: 
                </th>
                <th>
                {admission.examStartDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum ukončení zkoušek:
                </th>
                <th>
                {admission.examLastDate}
                </th>
            </tr>
            <tr>
                <th>
                Datum ukončení programu: 
                </th>
                <th>
                {admission.endDate}
                </th>
            </tr>            
            <tr>
                <th>
                Studijní program: 
                </th>
                <th>
                {admission.program.name}
                </th>
            </tr>      
            <tr>
                <th>
                Vytvořeno: 
                </th>
                <th>
                {admission.createdBy[0]}
                </th>
            </tr> 
            
            </tbody>

            
        </Table>
    )
}
