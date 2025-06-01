import { useState, useRef, useEffect } from "react";
import { useAsyncAction, createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer } from "@hrbolek/uoisfrontend-shared";
import {
  NewApplicationButton,
  ProgramLink,
  AdmissionsList
} from "@blacki005/applicant_page";
import styles from "./SearchAdmissions.module.css";


//query for searching admissions by pattern in the name
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


/**
 * SearchAdmissions component allows users to search for admissions by typing a pattern into an input field.
 * It fetches admissions data from a GraphQL API and displays the results dynamically.
 *
 * Props:
 * @param {Object} props - The props object.
 * @param {Object} props.user - The user object containing user-related information.
 * @param {Function} props.onChange - Callback function triggered when the component state changes.
 *
 * Features:
 * - Displays a clickable text that toggles the visibility of the input field.
 * - Fetches admissions data from the server based on the user's input with a 500ms delay.
 * - Dynamically updates the list of admissions as the user types.
 * - Hides the input field and clears the admissions list when clicking outside the component.
 * 
 * @returns {JSX.Element} Text field for searching admissions and list of admissions corresponding with pattern in searchbox.
 */
export const SearchAdmissions = ({ user, onChange, editable }) => {
  const { fetch: fetchAdmissionRead } = useAsyncAction(QueryAdmissionAsyncAction, {}, { deffered: true });

  //hooks
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef(null);
  const [admissions, setAdmissions] = useState([]);

  // Delayer - it needs to be implemented as a function
  const [delayer, setDelayer] = useState(() => CreateDelayer(500));

  const handleInputChange = (e) => {
    // data = what the user typed into the input
    const data = e.target.value;
    if (data.length > 2) {
      //fetch is called after 500ms
      delayer(() => fetchAdmissionRead({ pattern: `%${data}%` }).then(
        json => {
          // Extracting admissions from the JSON, returning an empty array if JSON is null
          const admissions = json?.data?.admissionPage || []
          setAdmissions(admissions);
          return json;
        }
      ))

    }
    else {
      // If the input is shorter than 3 characters, clear the admissions list
      setAdmissions([]);
    }
  }

  const handleTextClick = () => {
    setIsInputVisible(true);
  };

  const handleClickOutside = (event) => {
    // Pokud je inputRef nebo box s výsledky, zůstaň otevřené pokud klik uvnitř jednoho z nich
    const inputBox = inputRef.current;
    const resultsBox = document.getElementById("search-admissions-results");
    if (
      (inputBox && inputBox.contains(event.target)) ||
      (resultsBox && resultsBox.contains(event.target))
    ) {
      return;
    }
    setIsInputVisible(false);
    setAdmissions([]); // Clear the programs list when hiding
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchAdmissionsContainer}>
      <div className={styles.searchAdmissionsBar}>

        {!isInputVisible && (
          <p onClick={handleTextClick} className={styles.searchAdmissionsInput}>
            Vyhledávač vypsaných příjmacích řízení
          </p>
        )}
        {isInputVisible && (
          <div ref={inputRef}
            className={styles.searchAdmissionsBar}>
            <input
              type="text"
              defaultValue=""
              onChange={handleInputChange}
              className={styles.searchAdmissionsInput}
              placeholder="Zadejte název programu"
            />
          </div>
        )}
      </div>
      {isInputVisible && admissions && admissions.length > 0 && (
        <div
          className={styles.searchAdmissionsResults}
        >
          {admissions.map((admission) => (
            <div key={admission.id} className={styles.searchAdmissionsResult} onMouseDown={e => e.stopPropagation()}>
              {editable ?
                <NewApplicationButton admission={admission} user={user}/>
              :
                <ProgramLink program={admission.program}/>
              }
            </div>
          ))}
        </div>
      )}
      {!admissions || admissions.length === 0 && (
        <div>
           <AdmissionsList user={user} editable={editable} />
        </div>
      )}
    </div>
  )
}
