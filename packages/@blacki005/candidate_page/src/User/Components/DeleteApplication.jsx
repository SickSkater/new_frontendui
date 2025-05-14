import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { useState } from "react";
import { UserReadAsyncAction} from "../Queries"
import { Button} from "react-bootstrap"
import { StudentDeleteAsyncAction } from "../../Student";
import { PaymentDeleteAsyncAction } from "../../Payment";

/**
 * DeleteApplication Component
 * 
 * This component provides functionality to delete a student's application which is defined by associated payment record and study record.
 * It uses asynchronous GraphQL actions to perform the deletion and updates the user data accordingly.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.student - The student object containing details about the student and their payments.
 * @param {Object} props.student.payments - The payment object associated with the student.
 * @param {Object} props.user - The user object containing details about the user.
 * 
 * @returns {JSX.Element} A button that toggles between confirming and deleting the application.
 * 
 * @example
 * <DeleteAdmission student={studentData} user={userData} />
 */
export const DeleteApplication = ({student, user}) => {
    const {fetch: fetchPaymentDelete} = useAsyncAction(PaymentDeleteAsyncAction, {}, {deffered: true});
    const {fetch: fetchStudentDelete} = useAsyncAction(StudentDeleteAsyncAction, {}, {deffered: true});
    const {fetch : refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deffered: true});

    const onDelete = async () => {
        //parametry pro smazání přihlášky - tedy payment a student
        const studentDeleteParams = {
            id: student.id,
            lastchange: student.lastchange
        };
        const paymentDeleteParams = {
            id: student.payments.id,
            lastchange: student.payments.lastchange
        };

        await fetchPaymentDelete(paymentDeleteParams)
        fetchStudentDelete(studentDeleteParams).then(
            ()=>refetchUser({ id: student.student.id })
        )
    }

    function toggleButton() {
      const [isToggled, setIsToggled] = useState(false);
    
      const handleToggle = () => {
        setIsToggled(toggle => !toggle);
        if (isToggled) {
          onDelete();
        }
      };
    
      return (
        <Button 
          onClick={handleToggle}
          variant={isToggled ? 'primary' : 'danger'}
        >
          {isToggled ? 'Potvrdit smazání' : ' Smazat přihlášku'}
        </Button>
      );
    }

    return (
        <div>
            {toggleButton()}
        </div>
    )
}
