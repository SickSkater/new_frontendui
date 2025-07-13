import { Button } from "react-bootstrap";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import {
  PaymentInsertAsyncAction,
  StudentInsertAsyncAction,
  EvaluationInsertAsyncAction,
  UserReadAsyncAction,
  ProgramLink
} from "@blacki005/applicant_page";
import styles from "./NewApplicationButton.module.css";
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
  const { fetch: refetchUser } = useAsyncAction(UserReadAsyncAction, {}, { deffered: true });

  //returns true if the user already has an application for the given admission
  const hasApplication = ({ user, admission }) => {
    return user.studies.some(study => study.payments?.paymentInfo?.admission?.id === admission.id);
  }

  //called when the user clicks on the admission button
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
      amount: 0, //how much has been payed - determines wheter payment has been completed
      paymentInfoId: admission.paymentInfo.id
    };
    const evaluationInsertParams = {
      id: crypto.randomUUID(),
      points: 0,
      passed: false,
      description: "Příjmací zkouška",
      studentId: studentInsertParams.id,
    };

    await fetchStudentInsert(studentInsertParams);
    await fetchEvaluationInsert(evaluationInsertParams);
    await fetchPaymentInsert(paymentInsertParams)
    // Instead of onChange, UserReadAsyncAction is executed here as it has the same effect
    refetchUser({ id: user.id })
  };
  //don't show admissions user has already applied to
  if (hasApplication({ user, admission })) {
    return null;
  }
  return (
    <div className={styles.applicationButtonContainer}>
      <span>
        <ProgramLink program={admission.program} />
      </span>
      <Button
        className={styles.applicationButton}
        onClick={onClick}
      >
        Podat přihlášku
      </Button>
    </div>
  );
}