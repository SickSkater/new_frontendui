import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import {Button} from "react-bootstrap"
import { useState } from "react"
import { AdmissionInsertAsyncAction } from "../../Admission"
import { PaymentInfoInsertAsyncAction } from "../../PaymentInfo"
import { ProgramReadPageAsyncAction } from "../../Program"
import { ProgramInsertAsyncAction } from "../../Program"


/**
 * DataGenerator Component
 * 
 * This component provides functionality to generate random admissions and payment information
 * for a study program. It interacts with asynchronous actions to fetch or insert data and 
 * displays the generated data in a structured format.
 * 
 * @component
 * 
 * @returns {JSX.Element} Button for generating data, displays generated data/error when pressed.
 * 
 * @example
 * <DataGenerator />
 * 
 * @description
 * - Fetches available study programs using `ProgramReadPageAsyncAction`.
 * - Generates random payment information and admissions data.
 * - Inserts new program if no programs are available.
 * - Displays the generated payment information and admission details.
 *
 * @functions
 * - `generateRandomSWIFT`: Generates a random SWIFT code.
 * - `generateRandomAmount`: Generates a random payment amount.
 * - `GenerateAdmission`: Handles the generation and insertion of admission and payment info.
 * 
 * @loadingState
 * - Displays a loading message while fetching programs.
 * - Displays an error message if fetching programs fails.
 * 
 * @display
 * - Renders a button to trigger the generation process.
 * - Displays the generated payment information and admission details in JSON format.
 */
export const DataGenerator = () => {
    const { fetch: fetchAdmissionInsert } = useAsyncAction(AdmissionInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchPaymentInfoInsert } = useAsyncAction(PaymentInfoInsertAsyncAction, {}, { deffered: true });
    const { loading: programsLoading, error: programsError, dispatchResult: programs } = useAsyncAction(ProgramReadPageAsyncAction, {});
    const { fetch: fetchProgramInsert } = useAsyncAction(ProgramInsertAsyncAction, {}, { deffered: true });
    var [paymentInfo, setPaymentInfo] = useState(null);
    var [admission, setAdmission] = useState(null);


    //get available programs
    if (programsLoading) {
        return <div>Loading...</div>
    }
    if (programsError) {
        return <div>Error fetching study programs: {programsError.message}</div>
    }
    const n_programs = programs?.data?.result?.length || 0;


    const generateRandomSWIFT = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let swift = "";
        for (let i = 0; i < 8; i++) {
            swift += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return swift;
    }

    const generateRandomAmount = () => {
        const amounts = [400, 500, 600, 700];
        return amounts[Math.floor(Math.random() * amounts.length)];
    }


    const GenerateAdmission = async () => {
        var program = null;
        if (n_programs === 0) {
            //insert new program when there are no programs
            program = await fetchProgramInsert({
                id: crypto.randomUUID(),
                name: "Program " + Math.floor(Math.random() * 1000),
                nameEn: "Program EN " + Math.floor(Math.random() * 1000),
            });
        }
        else {
            //random program from the array of programs
            program = programs?.data?.result[Math.floor(Math.random() * n_programs)];
        }

        const paymentInfoInsertParams = {
            id: crypto.randomUUID(),
            accountNumber: Math.floor(100000000 + Math.random() * 900000000).toString() + "/" + Math.floor(1000 + Math.random() * 9000).toString(),
            specificSymbol: Math.floor(100000 + Math.random() * 900000).toString(),
            constantSymbol: Math.floor(1000 + Math.random() * 9000).toString(),
            IBAN: "CZ" + Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
            SWIFT: generateRandomSWIFT(),
            amount: generateRandomAmount(),
        }
    
        const admissionInsertParams = {
            id: crypto.randomUUID(),
            programId : program.id,
            paymentInfoId: paymentInfoInsertParams.id,
            name: program.name,
            nameEn: program.nameEn,
            applicationStartDate: new Date().toISOString().slice(0, -1), // Odstranění "Z"
            applicationLastDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, -1),
            endDate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().slice(0, -1),
            conditionDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString().slice(0, -1),
            paymentDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, -1),
            conditionExtendedDate: null,
            requestConditionExtendDate: null,
            requestExtraConditionsDate: null,
            requestExtraDateDate: null,
            examStartDate: new Date(new Date().setDate(new Date().getDate() + 50)).toISOString().slice(0, -1), // Odstranění "Z"
            examLastDate: new Date(new Date().setDate(new Date().getDate() + 55)).toISOString().slice(0, -1), // Odstranění "Z"
        }

        //insert payment info and admission, set hooks so the values are displayed
        const fetchedPaymentInfo = await fetchPaymentInfoInsert(paymentInfoInsertParams);
        const fetchedAdmission = await fetchAdmissionInsert(admissionInsertParams);
        setPaymentInfo(fetchedPaymentInfo);
        setAdmission(fetchedAdmission);
    }


    return (
        <div>
            <Button onClick={GenerateAdmission}>
                Generovat prijmaci rizeni
            </Button>
            {paymentInfo && (
                <div>
                    <h3>Payment Info:</h3>
                    <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
                </div>
            )}
            {admission && (
                <div>
                    <h3>Admission:</h3>
                    <pre>{JSON.stringify(admission, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}