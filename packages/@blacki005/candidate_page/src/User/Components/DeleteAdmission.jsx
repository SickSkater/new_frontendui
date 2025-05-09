import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";
import { useState } from "react";
import {UserReadAsyncAction, UserUpdateAsyncAction} from "../Queries"
import {useDispatch} from "react-redux"
import {UserMediumEditableContent} from "."
import { Pass } from "react-bootstrap-icons";
import {Button} from "react-bootstrap"


export const updateAdmissionsForUser = (jsonData) => async (dispatch, getState, next = (jsonResult)=>jsonResult) => {
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
const PaymentDeleteAsyncAction = createAsyncGraphQLAction(`
mutation paymentDelete($id: UUID!, $lastchange: DateTime!) {
  paymentDelete(payment: {id: $id, lastchange: $lastchange}) {
    __typename
    failed
    msg
    input
  }
}
`)
const PaymentInfoDeleteAsyncAction = createAsyncGraphQLAction(`
mutation paymentInfoDelete($id: UUID!, $lastchange: DateTime!) {
  paymentInfoDelete(paymentInfo: {id: $id, lastchange: $lastchange}) {
    __typename
    msg
    failed
    input
  }
}
`)
const AdmissionDeleteAsyncAction = createAsyncGraphQLAction(`
mutation admissionDelete($id: UUID!, $lastchange: DateTime!) {
  admissionDelete(admission: {id: $id, lastchange: $lastchange}) {
    __typename
    msg
    failed
    input
  }
}
`)



export const DeleteAdmission = ({student, user}) => {
    const {loading:  loadingAdmissionDelete, error: errorAdmissionDelete, fetch: fetchAdmissionDelete} = useAsyncAction(AdmissionDeleteAsyncAction, {}, {deffered: true});
    const {loading: loadingPaymentInfoDelete, error: errorPaymentInfoDelete, fetch: fetchPaymentInfoDelete} = useAsyncAction(PaymentInfoDeleteAsyncAction, {}, {deffered: true});
    const {loading: loadingPaymentDelete, error: errorPaymentDelete, fetch: fetchPaymentDelete} = useAsyncAction(PaymentDeleteAsyncAction, {}, {deffered: true});
    const {loading: loadingStudentDelete, error: errorStudentDelete, fetch: fetchStudentDelete} = useAsyncAction(StudentDeleteAsyncAction, {}, {deffered: true});
    const {fetch : refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deffered: true});
    const [programs, setPrograms] = useState([]);

    const onDelete = async () => {
        //console.log("UserData.onDelete")
        //delete everything
        const studentDeleteParams = {
            id: student.id,
            lastchange: student.lastchange
        };
        const paymentDeleteParams = {
            id: student.payments.id,
            lastchange: student.payments.lastchange
        };
        const paymentInfoDeleteParams = {
            id: student.payments.paymentInfo.id,
            lastchange: student.payments.paymentInfo.lastchange
        };
        const AdmissionDeleteParams = {
            id: student.payments.paymentInfo.admission.id,
            lastchange: student.payments.paymentInfo.admission.lastchange
        };

        // await fetchAdmissionDelete(AdmissionDeleteParams)
        await fetchPaymentInfoDelete(paymentInfoDeleteParams)
        await fetchPaymentDelete(paymentDeleteParams)
        fetchStudentDelete(studentDeleteParams).then(
            json=>refetchUser({ id: user.id })
        )


    }


    return (
        <div>
            {toggleButton()}
        </div>
    )

    function toggleButton() {
      const [isToggled, setIsToggled] = useState(false);
    
      const handleToggle = () => {
        setIsToggled(toggle => !toggle);
        if (isToggled) {
          onDelete();
        }
      };
    
      return (<Button 
          onClick={handleToggle}
          variant={isToggled ? 'primary' : 'danger'}
        >
          {isToggled ? 'Potvrdit smazání' : ' Smazat přihlášku'}
        </Button>
      );
    }
}
