
import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";
import { useState } from "react";
import {UserReadAsyncAction, UserUpdateAsyncAction} from "../Queries"
import {useDispatch} from "react-redux"
import {UserMediumEditableContent} from "."
import { Pass } from "react-bootstrap-icons";
import {Button} from "react-bootstrap"
// import { StudentDeleteAsyncAction } from "../../Student";
import { PaymentDeleteAsyncAction } from "../../Payment";


export const updateAdmissionsForUser = (jsonData) => async (dispatch, next = (jsonResult)=>jsonResult) => {
    const program = jsonData?.data?.programInsert;
    if (program) {
        const {__typename} = program
        if (__typename === "ProgramGQLModel") {
            const {user} = program.user;
            dispatch(ItemActions.item_update(user))
        }
    }
}

const StudentDeleteAsyncAction = createAsyncGraphQLAction(`
mutation studentDelete($id: UUID!, $lastchange: DateTime!) {
  studentDelete(student: {id: $id, lastchange: $lastchange}) {
    __typename
    msg
    failed
    input
  }
}
`, updateAdmissionsForUser)

export const DeleteAdmission = ({student, user}) => {
    const {fetch: fetchPaymentDelete} = useAsyncAction(PaymentDeleteAsyncAction, {}, {deffered: true});
    const {fetch: fetchStudentDelete} = useAsyncAction(StudentDeleteAsyncAction, {}, {deffered: true});
    const {fetch : refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deffered: true});
    const [programs, setPrograms] = useState([]);

    const onDelete = async () => {
        //parametry pro smazání přihlášky
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
            ()=>refetchUser({ id: user.id })
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
