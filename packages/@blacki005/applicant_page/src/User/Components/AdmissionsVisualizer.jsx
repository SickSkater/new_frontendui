import {
    NewApplicationButton,
    ProgramLink
} from "@blacki005/applicant_page";
import styles from "./AdmissionsVisualizer.module.css";
/**
 * AdmissionsVisualizer component renders a table displaying a list of admissions.
 * Filters the provided items to ensure each admission has a name, program, and paymentInfo.
 * Depending on the `editable` prop, it either renders a button for creating a new application
 * or a link to the program associated with the admission.
 *
 * @param {Array} items - Array of admission objects to be displayed.
 * @param {boolean} [editable=false] - Determines if the component is in editable mode.
 * @param {Object} [user] - User object passed to the NewApplicationButton component.
 *
 * @returns {JSX.Element} A table displaying the filtered admissions list.
 */
export const AdmissionsVisualizer = ({ items, ...props }) => {
    // Admissions must have name, program, and paymentInfo
    const filteredItems = items.filter(
        (item) => item.name && item.paymentInfo && item.program
    );

    //returns list of admissions that user didn't applied to with buttons to apply or links (if in RO mode)
    return (
        <div className={styles.admissionsListContainer}>
            <table className={styles.admissionsListTable}>
                <thead>
                    <tr>
                        <th className={styles.admissionsListTableTh}>
                            Seznam příjímacích řízení
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through the filtered items and render each admission */}
                    {filteredItems.map((admission) => (
                        // Each admission is rendered in a table row
                        <tr key={admission.id}>
                            <td className={styles.admissionsListTableTd}>
                                <div className={styles.admissionsListButtonContainer}>
                                    {props.editable ?
                                        <NewApplicationButton user={props.user} admission={admission} />
                                        :
                                        <ProgramLink program={admission.program} />
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};