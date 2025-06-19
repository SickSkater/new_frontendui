import React from "react";
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import {
    NewApplicationButton,
    AdmissionReadPageAsyncAction,
    ProgramLink
} from "@blacki005/applicant_page";
import styles from "./AdmissionsList.module.css";

/**
 * AdmissionsList Component
 * 
 * This component renders a list of admissions for a user, with support for infinite scrolling.
 * It uses the `InfiniteScroll` component to fetch and display admissions data dynamically.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user details.
 * @param {boolean} props.editable - Determines whether user can create new applications for listed admissions.
 * 
 * @returns {JSX.Element} The rendered AdmissionsList component.
 * 
 * @example
 * <AdmissionsList user={currentUser} editable={true} />
 * 
 * @description
 * - Fetches admissions data using the `useAsyncAction` hook and `AdmissionReadPageAsyncAction`.
 * - Displays admissions in a table format with filtering for valid admissions (must have name, program, and paymentInfo).
 * - Provides two modes:
 *   - Editable mode: Displays a button to create a new application for each admission.
 *   - Non-editable mode: Displays a link to the program associated with each admission.
 * - Utilizes CSS modules for styling.
 */
export const AdmissionsList = ({ user, editable }) => {
    const { fetch } = useAsyncAction(AdmissionReadPageAsyncAction, {}, { defferred: true });

    // Returns promise that resolves to array of admissions - asyncAction for InfiniteScroll
    const fetchItems = ({ skip, limit }) => async (dispatch) => {
        const response = await fetch({ limit, skip });
        if (response?.data?.admissionPage) {
            return response.data.admissionPage;
        } else {
            console.warn("No result found in response");
            return [];
        }
    };

    // Visualizer for displaying items in InfiniteScroll
    const ItemsVisualizer = ({ items }) => {
        // Admissions must have name, program, and paymentInfo
        const filteredItems = items.filter(
            (item) => item.name && item.paymentInfo && item.program
        );

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
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td className={styles.admissionsListTableTd}>
                                    <div className={styles.admissionsListButtonContainer}>
                                        {editable ?
                                            <NewApplicationButton
                                                user={user}
                                                admission={item}
                                            />
                                            :
                                            <ProgramLink program={item.program} />
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

    return (
        <div>
            <InfiniteScroll
                Visualiser={ItemsVisualizer}
                actionParams={{ skip: 0, limit: 10 }}
                asyncAction={fetchItems}
            />
        </div>
    );
};