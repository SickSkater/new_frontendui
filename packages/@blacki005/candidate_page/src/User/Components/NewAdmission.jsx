import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer, DeleteButton } from "@hrbolek/uoisfrontend-shared";
import { useState, useRef, useEffect } from "react";
import { UserReadAsyncAction, UserUpdateAsyncAction } from "../Queries"
import { useDispatch } from "react-redux"
import { UserMediumEditableContent } from "."
import { ProgramLink } from "../../Program";


//TODO odstranit
//nutny import knihovny uoistfrontend-gql-shared
const QueryGroupAsyncAction = createAsyncGraphQLAction(`
query ($pattern: String!) {
    programPage(where: {name: {_ilike: $pattern}}) {
        __typename
        id
        name
  }
}
`);


const QueryAdmissionAsyncAction = createAsyncGraphQLAction(`
query ($pattern: String!) {
  admissionPage(where: {name: {_ilike: $pattern}}) {
    __typename
    id
    name
    program {
      __typename
      id
      name
      nameEn
    }
    paymentInfo {
      __typename
      id
    }
  }
}
`)

const ExamInsertAsyncAction = createAsyncGraphQLAction(`
mutation examInsert(
  $name: String,
  $nameEn: String,
  $description: String,
  $descriptionEn: String,
  $minScore: Int,
  $maxScore: Int,
  $typeId: UUID,
  $parentId: UUID,
  $planId: UUID,
  $id: UUID) {
  examInsert(exam: {name: $name, nameEn: $nameEn, description: $description, descriptionEn: $descriptionEn, minScore: $minScore, maxScore: $maxScore, typeId: $typeId, parentId: $parentId, planId: $planId, id: $id}) {
    ... on ExamGQLModel {
      __typename
      id
    }
    ... on InsertError {...InsertError}
  }
}


fragment InsertError on InsertError {
  __typename
  msg
  failed
  input
  }
`)

const EvaluationInsertAsyncAction = createAsyncGraphQLAction(`
mutation evaluationInsert(
  $id: UUID,
  $semesterId: UUID, 
  $userId: UUID, 
  $order: Int, 
  $points: Int, 
  $passed: Boolean, 
  $description: String, 
  $grade: String, 
  $classificationlevelId: UUID, 
  $classificationplanId: UUID, 
  $eventId: UUID, 
  $parentId: UUID, 
  $studentId: UUID, 
  $examinerId: UUID, 
  $examId: UUID) {
  evaluationInsert(
    evaluation: {id: $id, semesterId: $semesterId, userId: $userId, order: $order, points: $points, passed: $passed, description: $description, grade: $grade, classificationlevelId: $classificationlevelId, classificationplanId: $classificationplanId, eventId: $eventId, parentId: $parentId, studentId: $studentId, examinerId: $examinerId, examId: $examId}
  ) {
    ... on EvaluationGQLModel {
      __typename
      id
      grade
    }
    ... on InsertError {
      ...InsertError
    }
  }
}

fragment InsertError on InsertError {
  __typename
  msg
  failed
  input
}
`)

const StudentInsertAsyncAction = createAsyncGraphQLAction(`
mutation studentInsert(
  $id: UUID,
  $userId: UUID,
  $programId: UUID,
  $stateId: UUID,
  $semesterNumber: Int
) {
  studentInsert(student: {id: $id, userId: $userId, programId: $programId, stateId: $stateId, semesterNumber: $semesterNumber}) {
    ... on StudentGQLModel { ...Student }
    ... on InsertError { ...InsertError }
  }
}

fragment Student on StudentGQLModel {
    __typename
 	id
}

fragment InsertError on InsertError {
  __typename
  msg
  failed
  input
  }
`)

const PaymentInsertAsyncAction = createAsyncGraphQLAction(`
mutation paymentInsert(
  $id: UUID,
  $studentId: UUID,
  $programId: UUID,
  $bankUniqueData: String,
  $variableSymbol: String,
  $amount: Float,
  $paymentInfoId: UUID
) {
  paymentInsert(payment: {id: $id, studentId: $studentId, programId: $programId, bankUniqueData: $bankUniqueData, variableSymbol: $variableSymbol, amount: $amount, paymentInfoId: $paymentInfoId}) {
    ... on PaymentGQLModel { ...Payment }
    ... on InsertError { ...InsertError }
  }
}

fragment Payment on PaymentGQLModel {
    __typename
    id
}


fragment InsertError on InsertError {
  __typename
  msg
  failed
  input
  }
`)


//komponenta, ktera zobrazuje jednu skupinu
//pri kliknuti da notifikaci userdata - tak se zajisti interaktivita kazde komponenty
const LocalProgram = ({ admission, onSelect }) => {
  
  const onClick = () => {
    onSelect(admission);
  }

  return (
    <div>
      {admission.program.name}
      <button onClick={onClick}>Podat prihlasku</button>
    </div>
  )
}


export const NewAdmission = ({ user, onChange, onBlur }) => {
  const { loading, error, fetch } = useAsyncAction(QueryAdmissionAsyncAction, {}, { deffered: true });
  const { loading: loadingPaymentInsert, error: errorPaymentInsert, fetch: fetchPaymentInsert } = useAsyncAction(PaymentInsertAsyncAction, {}, { deffered: true });
  const { loading: loadingStudentInsert, error: errorStudentInsert, fetch: fetchStudentInsert } = useAsyncAction(StudentInsertAsyncAction, {}, { deffered: true });
  const { loading: loadingEvaluationInsert, error: errorEvaluationInsert, fetch: fetchEvaluationInsert } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deffered: true });
  const { loading: loadingExamInsert, error: errorExamInsert, fetch: fetchExamInsert } = useAsyncAction(ExamInsertAsyncAction, {}, { deffered: true });
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef(null);
  const [admissions, setAdmissions] = useState([]);


  //zpozdovac, ma implicitni timeout
  //zadruhel, je treba to delat jako funkci
  const [delayer, setDelayer] = useState(() => CreateDelayer(500));



  //chvile, kdy uzivatel klikne na skupinu
  const onSelect = async (admission) => {
    // Prepare parameters for the insert mutations
    const studentInsertParams = {
      id: crypto.randomUUID(),
      userId: user.id,
      programId: admission.program.id,
      stateId: crypto.randomUUID(), // Placeholder, because we don't use states
      semesterNumber: 0,
    };
    const paymentInsertParams = {
      studentId: studentInsertParams.id,
      bankUniqueData: "bank unique data",
      variableSymbol: "variable symbol",
      amount: 0,
      paymentInfoId: admission.paymentInfo.id
    };




    //TODO: Error handling - neresit
    await fetchStudentInsert(studentInsertParams);

    // await fetchExamInsert(examInsertParams);
    // await fetchEvaluationInsert(evaluationInsertParams);
    
    await fetchPaymentInsert(paymentInsertParams).then(
      json => onChange({target: { value: user }})
    )
  };

  const onChange_ = (e) => {
    const data = e.target.value;
    //data jsou to, co uzivatel zadal do inputu
    //necheme hledat pomoci 1 nebo 0 znaku
    //nekdo pise rychle a nechceme zahltit server - posilat packet pri kazdem znaku
    if (data.length > 2) {
      //vypisovani do konzole + delay:
      delayer(() => fetch({ pattern: `%${data}%` }).then(
        json => {
          //z jsonu vytahuju to co potrebuju
          //otaznik znamena - nejsem si jisty, ze to tam je - pokud to tam neni, tak to vrati null
          //or zajistuje ze se vrati prazdne pole, bude-li tam null
          const admissions = json?.data?.admissionPage || []
          setAdmissions(admissions);
          return json;
        }
      ))

    }
    else {
      setAdmissions([]);
    }
  }

  const handleTextClick = () => {
    setIsInputVisible(true);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsInputVisible(false);
      setAdmissions([]); // Clear the programs list when hiding
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {!isInputVisible && (
        <p onClick={handleTextClick} style={{ cursor: "pointer", color: "blue" }}>
          Vyhledávač vypsaných příjmacích řízení
        </p>
      )}
      {isInputVisible && (
        <div ref={inputRef}
        style={{
          position: "absolute", // Překrytí ostatních prvků
          top: "1px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          zIndex: 1000, // Zajistí, že bude nad ostatními prvky
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          width: "400px",
        }}
      >
          <input
            type="text"
            defaultValue=""
            onChange={onChange_}
            className="form-control"
            placeholder="Zadejte název programu"
          />
          {admissions &&
            admissions.map((admission) => {
              return <LocalProgram key={admission.program.id} admission={admission} onSelect={onSelect} />;
          })}
        </div>
      )}
    </div>
  )
}
