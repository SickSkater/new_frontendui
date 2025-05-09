import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer, DeleteButton } from "@hrbolek/uoisfrontend-shared";
import { useState, useRef, useEffect } from "react";
import { UserReadAsyncAction, UserUpdateAsyncAction } from "../Queries"
import { useDispatch } from "react-redux"
import { UserMediumEditableContent } from "."
import { ProgramLink } from "../../Program";

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

//zapise usera do cache
export const updateMembershipsForUser = (jsonData) => async (dispatch, getState, next = (jsonResult) => jsonResult) => {
  const program = jsonData?.data?.programInsert;
  if (program) {
    const { __typename } = program
    if (__typename === "ProgramGQLModel") {
      const { user } = program.user;
      dispatch(ItemActions.item_update(user))
    }
  }
}

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

const PaymentInfoInsertAsyncAction = createAsyncGraphQLAction(`
mutation paymentInfoInsert(
  $id: UUID,
  $accountNumber: String,
  $specificSymbol: String,
  $constantSymbol: String,
  $IBAN: String,
  $SWIFT: String,
  $amount: Float
) {
  paymentInfoInsert(paymentInfo: {id: $id, accountNumber: $accountNumber, specificSymbol: $specificSymbol, constantSymbol: $constantSymbol, IBAN: $IBAN, SWIFT: $SWIFT, amount: $amount}) {
    ... on PaymentInfoGQLModel { ...PaymentInfo }
    ... on InsertError { ...InsertError }
  }
}

fragment PaymentInfo on PaymentInfoGQLModel {
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

const AdmissionInsertAsyncAction = createAsyncGraphQLAction(`
mutation admissionInsert(
  $programId: UUID!,
  $id: UUID,
  $name: String,
  $nameEn: String,
  $stateId: UUID,
  $paymentInfoId: UUID,
  $applicationStartDate: DateTime,
  $applicationLastDate: DateTime,
  $endDate: DateTime,
  $conditionDate: DateTime,
  $paymentDate: DateTime,
  $conditionExtendedDate: DateTime,
  $requestConditionExtendDate: DateTime,
  $requestExtraConditionsDate: DateTime,
  $requestExtraDateDate: DateTime,
  $examStartDate: DateTime,
  $examLastDate: DateTime,
  $studentEntryDate: DateTime
) {
  admissionInsert(admission: {programId: $programId, id: $id, name: $name, nameEn: $nameEn, stateId: $stateId, paymentInfoId: $paymentInfoId, applicationStartDate: $applicationStartDate, applicationLastDate: $applicationLastDate, endDate: $endDate, conditionDate: $conditionDate, paymentDate: $paymentDate, conditionExtendedDate: $conditionExtendedDate, requestConditionExtendDate: $requestConditionExtendDate, requestExtraConditionsDate: $requestExtraConditionsDate, requestExtraDateDate: $requestExtraDateDate, examStartDate: $examStartDate, examLastDate: $examLastDate, studentEntryDate: $studentEntryDate}) {
    ... on AdmissionGQLModel { ...Admission }
    ... on InsertError { ...InsertError }
  }
}

fragment Admission on AdmissionGQLModel {
  __typename
  id
  name
}

fragment InsertError on InsertError {
  __typename
  msg
  failed
  input
}
`, updateMembershipsForUser)
//povykonani bude zavolan middleware, ktery zajisti zapis do cache a prekresleni vsech komponent


//komponenta, ktera zobrazuje jednu skupinu
//pri kliknuti da notifikaci userdata - tak se zajisti interaktivita kazde komponenty
const LocalProgram = ({ program, onSelect }) => {
  const onClick = () => {
    onSelect(program);
  }
  return (
    <div>
      {program.name}
      <button onClick={onClick}>Podat prihlasku</button>
    </div>
  )
}


export const NewAdmission = ({ user }) => {
  const { loading, error, fetch } = useAsyncAction(QueryGroupAsyncAction, {}, { deffered: true });
  const { loading: loadingAdmissionInsert, error: errorAdmissionInsert, fetch: fetchAdmissionInsert } = useAsyncAction(AdmissionInsertAsyncAction, {}, { deffered: true });
  const { loading: loadingPaymentInfoInsert, error: errorPaymentInfoInsert, fetch: fetchPaymentInfoInsert } = useAsyncAction(PaymentInfoInsertAsyncAction, {}, { deffered: true });
  const { loading: loadingPaymentInsert, error: errorPaymentInsert, fetch: fetchPaymentInsert } = useAsyncAction(PaymentInsertAsyncAction, {}, { deffered: true });
  const { loading: loadingStudentInsert, error: errorStudentInsert, fetch: fetchStudentInsert } = useAsyncAction(StudentInsertAsyncAction, {}, { deffered: true });
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef(null);
  const { fetch: refetchUser } = useAsyncAction(UserReadAsyncAction, {}, { deffered: true });
  const [programs, setPrograms] = useState([]);


  //zpozdovac, ma implicitni timeout
  //zadruhel, je treba to delat jako funkci
  const [delayer, setDelayer] = useState(() => CreateDelayer(500));



  //chvile, kdy uzivatel klikne na skupinu
  const onSelect = async (program) => {
    // Prepare parameters for the insert mutations
    const studentInsertParams = {
      id: crypto.randomUUID(),
      userId: user.id,
      programId: program.id,
      stateId: crypto.randomUUID(), // Placeholder, because we don't use states
      semesterNumber: 0,
    };
    const paymentInfoInsertParams = {
      id: crypto.randomUUID(),
      accountNumber: "0000 0000 0000 0011",
      specificSymbol: "80",
      constantSymbol: "54321",
      IBAN: "AL35202111090000000001234567",
      SWIFT: "ANNA-BB-CC-123",
      amount: 600.0,
    };
    const paymentInsertParams = {
      studentId: studentInsertParams.id,
      bankUniqueData: "bank unique data",
      variableSymbol: "variable symbol",
      amount: 0,
      paymentInfoId: paymentInfoInsertParams.id
    };
    const admissionInsertParams = {
      programId: program.id,
      id: crypto.randomUUID(),
      name: program.name,
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
    };

    //TODO: Error handling
    await fetchStudentInsert(studentInsertParams)
    await fetchPaymentInfoInsert(paymentInfoInsertParams);
    await fetchPaymentInsert(paymentInsertParams);
    fetchAdmissionInsert(admissionInsertParams).then(
      json => refetchUser({ id: user.id })
    );
  };

  const onChange = (e) => {
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
          const programs = json?.data?.programPage || []
          setPrograms(programs);
          return json;
        }
      ))

    }
    else {
      setPrograms([]);
    }
  }

  const handleTextClick = () => {
    setIsInputVisible(true);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsInputVisible(false);
      setPrograms([]); // Clear the programs list when hiding
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
          Vyhledávač studijního programu
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
            onChange={onChange}
            className="form-control"
            placeholder="Zadejte název programu"
          />
          {programs &&
            programs.map((program) => {
              return <LocalProgram key={program.id} program={program} onSelect={onSelect} />;
            })}
        </div>
      )}
    </div>
  )
}
