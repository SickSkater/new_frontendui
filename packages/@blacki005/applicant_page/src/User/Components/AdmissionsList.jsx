import React from "react";
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { 
    AdmissionLink,
    AdmissionReadPageAsyncAction,
    SearchAdmissions
 } from "@blacki005/applicant_page";


//TODO: frontend - podat prihlasku pri klepnuti na odkaz
//visualizer for displaying items in InfiniteScroll
const ItemsVisualizer = ({ items }) => (
    <div>
        {items.map((item) => (
            <div key={item.id}>
                <AdmissionLink admission={item}/>
                <br/>
            </div>
        ))}
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
            Vyhledat prijmaci rizeni:
            <SearchAdmissions user={user}/>
            Vypsana prijmaci rizeni:
            <InfiniteScroll
                Visualiser={ItemsVisualizer}
                actionParams={{ skip: 0, limit: 10 }}
                asyncAction={fetchItems}
            />
        </div>
    )
}