import { useAsyncAction, createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer} from "@hrbolek/uoisfrontend-shared";
import { useState, useRef, useEffect } from "react";
import { PaymentInsertAsyncAction } from "../../Payment";
import { StudentInsertAsyncAction } from "../../Student";
import { EvaluationInsertAsyncAction } from "../../Evaluation";
import { UserReadAsyncAction } from "../Queries";

//query pro vyhledani admissions podle pattern ve jmenu
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


//komponenta, ktera zobrazuje jednu skupinu
//pri kliknuti da notifikaci userdata - tak se zajisti interaktivita kazde komponenty
const LocalAdmission = ({ admission, onSelect }) => {
  
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


/**
 * Component for creating a new application for admission.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.user - The user object containing user data.
 * @param {Function} props.onChange - Callback function triggered when the user data changes.
 * 
 * @description
 * This component allows users to search for admission programs and submit applications. 
 * It includes an input field for searching admissions by programs, displays a list of matching admissions, 
 * and handles the submission of applications by interacting with various asynchronous actions.
 * 
 * Features:
 * - Delayed search to prevent excessive server requests.
 * - Displays a list of admission programs based on user input.
 * - Handles the creation of student and payment records upon application submission.
 * - Closes the input field and clears the program list when clicking outside the component.
 * 
 * @example
 * <NewAdmission user={userObject} onChange={handleAdmissionChange} />
 */
export const NewApplication = ({ user, onChange }) => {
  const { fetch: fetchAdmissionRead } = useAsyncAction(QueryAdmissionAsyncAction, {}, { deffered: true });
  const { fetch: fetchPaymentInsert } = useAsyncAction(PaymentInsertAsyncAction, {}, { deffered: true });
  const { fetch: fetchStudentInsert } = useAsyncAction(StudentInsertAsyncAction, {}, { deffered: true });
  const { fetch: fetchEvaluationInsert } = useAsyncAction(EvaluationInsertAsyncAction, {}, { deffered: true });
  const {fetch : refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deffered: true});

  //hooks
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef(null);
  const [admissions, setAdmissions] = useState([]);

  //zpozdovac - je treba to delat jako funkci
  const [delayer, setDelayer] = useState(() => CreateDelayer(500));

  //vola se kdyz uzivatel klikne na admission z dropdownu
  const onSelect = async (admission) => {
    //parametry pro insert
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
      //TODO:  examId: UUID 
    };

    await fetchStudentInsert(studentInsertParams);
    await fetchEvaluationInsert(evaluationInsertParams);
    fetchPaymentInsert(paymentInsertParams).then(
      //misto onChange se provede UserReadAsyncAction, protoze ma zde stejny efekt
      () => { refetchUser({ id: user.id }) }
    )
  };

  const handleInputChange = (e) => {
    //data = to co uzivatel napsal do inputu
    const data = e.target.value;
    if (data.length > 2) {
      //fetch se vola az po 500ms
      delayer(() => fetchAdmissionRead({pattern: `%${data}%` }).then(
        json => {
          //z jsonu vytahuju admissions, vracim prazdny array kdyz je json null
          const admissions = json?.data?.admissionPage || []
          setAdmissions(admissions);
          return json;
        }
      ))

    }
    else {
      //kdyz je delsi nez 2 znaky, tak se vymaze seznam admission
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
            onChange={handleInputChange}
            className="form-control"
            placeholder="Zadejte název programu"
          />
          {admissions &&
            admissions.map((admission) => {
              return <LocalAdmission key={admission.program.id} admission={admission} onSelect={onSelect} />;
          })}
        </div>
      )}
    </div>
  )
}
