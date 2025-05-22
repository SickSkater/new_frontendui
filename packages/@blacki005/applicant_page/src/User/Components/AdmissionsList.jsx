import React from "react";
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { 
    AdmissionLink,
    AdmissionReadPageAsyncAction,
    SearchAdmissions
 } from "@blacki005/applicant_page";


//TODO: frontend
//visualizer for displaying items in InfiniteScroll
const ItemsVisualizer = ({ items }) => (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <table className="table table-striped table-bordered table-hover" style={{ width: "80%", margin: "24px auto 0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <thead>
                <tr>
                    <th style={{ textAlign: "center", fontSize: 18, background: "#f0f4fa", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                        Seznam příjímacích řízení
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td style={{ textAlign: "center", fontWeight: 500, fontSize: 16, padding: "12px 0" }}>
                            <AdmissionLink admission={item}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);



/**
 * Component for displaying a list of admissions with infinite scrolling.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user-specific information for displaying NewApplication component.
 * @returns {JSX.Element} The rendered InfiniteScroll of all admissions with admission searching feature.
 */
export const AdmissionsList = ({user}) => {
    const { fetch } = useAsyncAction(AdmissionReadPageAsyncAction, {}, { defferred: true });

    //returns promise that resolves to array of admissions - asyncAction for InfiniteScroll
    const fetchItems = ({ skip, limit }) => async (dispatch) => {
        const response = await fetch({ limit, skip});
        // Check if the response contains the expected data
        if (response?.data?.admissionPage) {
            return response.data.admissionPage;
        } else {
            console.warn("No result found in response");
            return [];
        }
    };

    //TODO: frontend - aby se textove pole vyhledavace zobrazilo pod nim - nejak to vyresit
    //TODO: odstranit NewApplication z puvodniho mista
    return (
        <div>
            <InfiniteScroll
                Visualiser={ItemsVisualizer}
                actionParams={{ skip: 0, limit: 10 }}
                asyncAction={fetchItems}
            />
        </div>
    )
}