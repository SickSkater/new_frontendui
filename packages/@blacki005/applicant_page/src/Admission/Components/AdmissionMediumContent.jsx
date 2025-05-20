import { Tab } from "react-bootstrap";
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
import Table from 'react-bootstrap/Table';

// Funkce pro formátování data
const formatDate = (dateTime) => {
    if (!dateTime) return "N/A";
    const date = new Date(dateTime);
    return date.toLocaleDateString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

export const AdmissionMediumContent = ({ admission, children }) => {
    return (
        <div>
            {/* Tabulka pro párové prvky */}
            <Table responsive bordered hover striped className="text-center">
                <thead>
                    <tr>
                        <th>Lorem ipsum</th>
                        <th>Datum zahájení</th>
                        <th>Datum ukončení</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Podávání přihlášek:</th>
                        <td>{formatDate(admission.applicationStartDate)}</td>
                        <td>{formatDate(admission.applicationLastDate)}</td>
                    </tr>
                    <tr>
                        <th>Požadavky pro přijetí:</th>
                        <td>{formatDate(admission.conditionDate)}</td>
                        <td>{formatDate(admission.endDate)}</td>
                    </tr>
                    <tr>
                        <th>Platba:</th>
                        <td>{formatDate(admission.paymentDate)}</td>
                        <td>{formatDate(admission.conditionExtendedDate)}</td>
                    </tr>
                    <tr>
                        <th>Zkouška:</th>
                        <td>{formatDate(admission.examStartDate)}</td>
                        <td>{formatDate(admission.examLastDate)}</td>
                    </tr>
                    <tr>
                        <th>Nástup studenta:</th>
                        <td>{formatDate(admission.studentEntryDate)}</td>
                        <td>N/A</td>
                    </tr>
                </tbody>
            </Table>

            {/* Tabulka pro ostatní prvky */}
            <Table responsive bordered hover striped className="text-center">
                <tbody>
                    <tr>
                        <th>ID:</th>
                        <td>{admission.id}</td>
                    </tr>
                    <tr>
                        <th>Název:</th>
                        <td>{admission.name}</td>
                    </tr>
                    <tr>
                        <th>Anglický název:</th>
                        <td>{admission.nameEn}</td>
                    </tr>
                    <tr>
                        <th>Stav ID:</th>
                        <td>{admission.stateId || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Žádost o prodloužení podmínek:</th>
                        <td>{formatDate(admission.requestConditionExtendDate)}</td>
                    </tr>
                    <tr>
                        <th>Žádost o extra podmínky:</th>
                        <td>{formatDate(admission.requestExtraConditionsDate)}</td>
                    </tr>
                    <tr>
                        <th>Žádost o extra datum:</th>
                        <td>{formatDate(admission.requestExtraDateDate)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};