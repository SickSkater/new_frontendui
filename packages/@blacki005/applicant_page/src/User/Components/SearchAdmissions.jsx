import { useState, useRef, useEffect } from "react";
import { useAsyncAction, createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";
import { CreateDelayer} from "@hrbolek/uoisfrontend-shared";
import { NewApplicationButton } from "@blacki005/applicant_page";

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
export const SearchAdmissions = ({ user, onChange }) => {
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
      delayer(() => fetchAdmissionRead({pattern: `%${data}%` }).then(
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
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "block", width: "100%" }}>
        {!isInputVisible && (
          <p onClick={handleTextClick} style={{ cursor: "pointer", color: "blue", margin: 0, width: "100%", textAlign: "center" }}>
            Vyhledávač vypsaných příjmacích řízení
          </p>
        )}
        {isInputVisible && (
          <div ref={inputRef}
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "white",
              zIndex: 1000,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: 8,
            }}
          >
            <input
              type="text"
              defaultValue=""
              onChange={handleInputChange}
              className="form-control"
              placeholder="Zadejte název programu"
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
      {isInputVisible && admissions && admissions.length > 0 && (
        <div style={{
          position: "absolute",
          top: 0,
          left: "100%",
          marginLeft: 16,
          minWidth: 220,
          maxWidth: 320,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0px 4px 6px rgba(0,0,0,0.10)",
          padding: 8,
          zIndex: 2000
        }}>
          {admissions.map((admission) => (
            <div key={admission.id} style={{ marginBottom: 8 }}>
              <NewApplicationButton admission={admission} user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
