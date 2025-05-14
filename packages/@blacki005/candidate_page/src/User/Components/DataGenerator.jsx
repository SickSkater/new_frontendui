import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import {Button} from "react-bootstrap"
import { AdmissionInsertAsyncAction } from "../../Admission"
import { PaymentInfoInsertAsyncAction } from "../../PaymentInfo"
import { EvaluationInsertAsyncAction } from "../../Evaluation"
import { ProgramReadPageAsyncAction } from "../../Program"


//chci mit button na pridani prijmacich rizeni ke vsem programum ktere jsou dostupbne
//in construction - bude to stranka generujici data, ktera nase stranka pouziva


export const DataGenerator = ({student, user}) => {
    const { fetch: fetchAdmissionInsert } = useAsyncAction(AdmissionInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchPaymentInfoInsert } = useAsyncAction(PaymentInfoInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchEvaluationInsert } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchExamInsert } = useAsyncAction(ExamInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchProgramRead, entity } = useAsyncAction(ProgramReadPageAsyncAction, {}, { deffered: true })

    const paymentInfoInsertParams = {
        id: crypto.randomUUID(),
        accountNumber: "123456789",
        specificSymbol: "123456789",
        constantSymbol: "123456789",
        IBAN: "123456789",
        SWIFT: "123456789",
        amount: 0,
    }


    const admissionInsertParams = {
        id: crypto.randomUUID(),
        programId : "723f9209-e9ff-4cfe-b489-96f75e40f35b",
        name: "Nigger",
        paymentInfoId: paymentInfoInsertParams.id,
        nameEn: "Lorem Ipsum",
        stateId: crypto.randomUUID(),
        applicationStartDate: new Date().toISOString().slice(0, -1), // Odstranění "Z"
        applicationLastDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, -1), // Odstranění "Z"
        endDate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString().slice(0, -1), // Odstranění "Z"
        conditionDate: new Date(new Date().setDate(new Date().getDate() + 45)).toISOString().slice(0, -1), // Odstranění "Z"
        paymentDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, -1), // Odstranění "Z"
        conditionExtendedDate: null,
        requestConditionExtendDate: null,
        requestExtraConditionsDate: null,
        requestExtraDateDate: null,
        examStartDate: new Date(new Date().setDate(new Date().getDate() + 50)).toISOString().slice(0, -1), // Odstranění "Z"
        examLastDate: new Date(new Date().setDate(new Date().getDate() + 55)).toISOString().slice(0, -1), // Odstranění "Z"
        studentEntryDate: new Date(new Date().setDate(new Date().getDate() + 70)).toISOString().slice(0, -1), // Odstranění "Z"
    }



    const GenerateData = async () => {
        // Prepare parameters for the insert mutations
        const inputs = document.querySelectorAll('.form-control');
        const programNameInput = inputs[0]?.value || ""; // Assuming the first input is for program name
        const anotherParameterInput = inputs[1]?.value || ""; // Assuming the second input is for another parameter
        // Add more variables as needed for additional input fields
        



        const evaluationInsertParams = {}
        const examInsertParams = {}
        
        // fetchPaymentInfoInsert(paymentInfoInsertParams).then(
        //     json => fetchAdmissionInsert(admissionInsertParams)
        // )
    }


    const GenerateRandomData = async () => {
        console.log("Generating random data...");
    }


    return (
        <div>
            <input
                type="text"
                defaultValue=""
                className="form-control"
                placeholder="Zadejte název programu"
            />
            <input
                type="text"
                defaultValue=""
                className="form-control"
                placeholder="Zadejte název programu"
            />
            <input
                type="text"
                defaultValue=""
                className="form-control"
                placeholder="Zadejte název programu"
            />
            <input
                type="date"
                defaultValue=""
                className="form-control"
                placeholder="Zadejte název programu"
            />
            <Button onClick={GenerateData}>
                Generovat data
            </Button>
            <Button onClick={GenerateRandomData}>
                Generovat náhodná data
            </Button>
            
            
        </div>
    )
}