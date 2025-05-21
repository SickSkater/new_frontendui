import { Button } from "react-bootstrap";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import {
    PaymentInsertAsyncAction,
    StudentInsertAsyncAction,
    EvaluationInsertAsyncAction,
    UserReadAsyncAction
} from "@blacki005/applicant_page";

/**
 * A React component that renders a button for submitting a new application.
 * When clicked, it triggers a series of asynchronous actions to insert a new student,
 * evaluation, and payment record, and then refreshes the user data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user details.
 * @param {Object} props.admission - The admission object containing program and payment info.
 *
 * @returns {JSX.Element} A styled button component for submitting a new application.
 */
export const NewApplicationButton = ({ user, admission }) => {
  const { fetch: fetchPaymentInsert } = useAsyncAction(PaymentInsertAsyncAction, {}, { deffered: true });
  const { fetch: fetchStudentInsert } = useAsyncAction(StudentInsertAsyncAction, {}, { deffered: true });
  const { fetch: fetchEvaluationInsert } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deffered: true });
  const {fetch : refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deffered: true});

  //called when the user selects an admission
  const onClick = async () => {
    const studentInsertParams = {
      id: crypto.randomUUID(),
      userId: user.id,
      programId: admission.program.id,
      stateId: crypto.randomUUID(), // placeholder
      semesterNumber: 0,
    };
    const paymentInsertParams = {
      studentId: studentInsertParams.id,
      bankUniqueData: "bank unique data",
      variableSymbol: "variable symbol",
      amount: 0,
      paymentInfoId: admission.paymentInfo.id
    };
    const evaluationInsertParams = {
      id: crypto.randomUUID(),
      points: 0, 
      passed: false, 
      description: "Prijmaci zkouska", 
      studentId: studentInsertParams.id,
    };

    await fetchStudentInsert(studentInsertParams);
    await fetchEvaluationInsert(evaluationInsertParams);
    await fetchPaymentInsert(paymentInsertParams)
    // Instead of onChange, UserReadAsyncAction is executed here as it has the same effect
    refetchUser({ id: user.id })
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', border: '1px solid #ccc', padding: '0.5rem', margin: '0.5rem', backgroundColor: "whitesmoke" }}>
      <span>{admission.program.name}</span>
      <Button style={{ padding: '0.25rem 0.5rem', fontSize: 'inherit' }} onClick={onClick}>Podat přihlášku</Button>
    </div>
  )
}