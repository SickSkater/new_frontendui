import { useState } from "react"
import { useParams } from "react-router"

import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { UserLargeCard, UserMediumCard } from "../Components"
import { UserReadAsyncAction, UserReadPageAsyncAction } from "../Queries"
import { UserPageNavbar } from "./UserPageNavbar"

/**
 * A page content component for displaying detailed information about an user entity.
 *
 * This component utilizes `UserLargeCard` to create a structured layout and displays 
 * the serialized representation of the `user` object within the card's content.
 *
 * @component
 * @param {Object} props - The properties for the UserPageContent component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The name or label of the user entity.
 *
 * @returns {JSX.Element} A JSX element rendering the page content for an user entity.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 * 
 * <UserPageContent user={userEntity} />
 */

import { UserPaymentInfoAttribute } from "../Scalars/UserPaymentInfoAttribute"
import { UserAdmissionAttribute } from "../Scalars/UserAdmissionAttribute"
const temp_data = {
      "userById": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "John",
        "surname": "Doe",
        "studies": [
          {
            "payments": [
              {
                "paymentInfo": {
                  "amount": 700,
                  "admission": {
                    "applicationStartDate": "2025-01-01",
                    "applicationLastDate": "2025-01-31",
                    "endDate": "2025-06-30",
                    "conditionDate": "2025-01-10",
                    "paymentDate": "2025-02-01",
                    "examStartDate": "2025-05-01",
                    "examLastDate": "2025-05-15",
                    "studentEntryDate": "2025-02-01",
                    "createdBy": [
                      "123e4567-e89b-12d3-a456-426614174000",
                    ],
                    "program": {
                      "name": "Kybernetická bezpečnost"
                    },
                    "paymentInfo": {
                      "amount": 700,
                      "accountNumber": "1234567890",
                      "specificSymbol": "AB123",
                      "constantSymbol": "XYZ987",
                      "IBAN": "GB29NWBK60161331926819",
                      "SWIFT": "NWBKGB2L"
                    }
                  }
                }
              }
            ],
            "evaluations": [
              {
                "points": 95,
                "grade": "A",
                "description": "Excellent performance in the final exam.",
                "passed": true
              }
            ]
          }
        ]
      }
    }
  
  
const UserPageContent = ({user}) => {
    return (<>
        <UserPageNavbar user={user} />
        <UserLargeCard user={user}>
        </UserLargeCard>
    </>)
}

/**
 * A lazy-loading component for displaying content of an user entity.
 *
 * This component is created using `createLazyComponent` and wraps `UserPageContent` to provide
 * automatic data fetching for the `user` entity. It uses the `UserReadAsyncAction` to fetch
 * the entity data and dynamically injects it into the wrapped component as the `user` prop.
 *
 * @constant
 * @type {React.Component}
 *
 * @param {Object} props - The props for the lazy-loading component.
 * @param {string|number} props.user - The identifier of the user entity to fetch and display.
 *
 * @returns {JSX.Element} A component that fetches the `user` entity data and displays it
 * using `UserPageContent`, or shows loading and error states as appropriate.
 *
 * @example
 * // Example usage:
 * const userId = "12345";
 *
 * <UserPageContentLazy user={userId} />
 */
const UserPageContentLazy = ({user}) => {
    const { error, loading, entity, fetch } = useAsyncAction(UserReadAsyncAction, user)
    const [delayer] = useState(() => CreateDelayer())

    const handleChange = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleChange.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }
    const handleBlur = async(e) => {
        // console.log("GroupCategoryPageContentLazy.handleBlur.e", e)
        const data = e.target.value
        const serverResponse = await delayer(() => fetch(data))
        // console.log("GroupCategoryPageContentLazy.serverResponse", serverResponse)
    }

    return (<>
        {loading && <LoadingSpinner />}
        {error && <ErrorHandler errors={error} />}
        {entity && <UserPageContent user={entity}  onChange={handleChange} onBlur={handleBlur} />}
    </>)
}

/**
 * A page component for displaying lazy-loaded content of an user entity.
 *
 * This component extracts the `id` parameter from the route using `useParams`,
 * constructs an `user` object, and passes it to the `UserPageContentLazy` component.
 * The `UserPageContentLazy` component handles the lazy-loading and rendering of the entity's content.
 *
 * @component
 * @returns {JSX.Element} The rendered page component displaying the lazy-loaded content for the user entity.
 *
 * @example
 * // Example route setup:
 * <Route path="/user/:id" element={<UserPage />} />
 *
 * // Navigating to "/user/12345" will render the page for the user entity with ID 12345.
 */
export const UserPage = () => {
    const {id} = useParams()
    const user = {id}
    return <UserPageContentLazy user={user} />
}