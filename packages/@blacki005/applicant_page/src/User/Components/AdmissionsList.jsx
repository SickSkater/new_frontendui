import React from "react";
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import {
    NewApplicationButton,
    AdmissionReadPageAsyncAction
} from "@blacki005/applicant_page";
import styles from "./AdmissionsList.module.css";

//TODO: frontend - podat prihlasku pri klepnuti na odkaz

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
                                        <NewApplicationButton
                                            user={user}
                                            admission={item}
                                            editable={editable}
                                        />
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