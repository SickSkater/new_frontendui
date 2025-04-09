import { Button } from "react-bootstrap";
import { AdmissionLink } from "../../Admission/Components/AdmissionLink";
import { PaymentInfoLink } from "../../PaymentInfo/Components";
import { UserLink } from "../../User/Components/UserLink";
import { EvaluationLink } from "../../Evaluation/Components/EvaluationLink";

/**
 * A component that displays medium-level content for an buttons entity.
 *
 * This component renders a label "ButtonsMediumContent" followed by a serialized representation of the `buttons` object
 * and any additional child content. It is designed to handle and display information about an buttons entity object.
 *
 * @component
 * @param {Object} props - The properties for the ButtonsMediumContent component.
 * @param {Object} props.buttons - The object representing the buttons entity.
 * @param {string|number} props.buttons.id - The unique identifier for the buttons entity.
 * @param {string} props.buttons.name - The name or label of the buttons entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `buttons` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const buttonsEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ButtonsMediumContent buttons={buttonsEntity}>
 *   <p>Additional information about the entity.</p>
 * </ButtonsMediumContent>
 */
function getURLKey(url) {
    const urlParts = url.split("/");
    const key = urlParts[1];
    return key;
}
const temp_id = {
    "id":"6a6ca6e9-2222-498f-b270-b7b07c2afa41",
    "name": "placeholder"

}
export const ButtonsMediumContent = ({buttons, children}) => {
    buttons = temp_id
    return (
        <>
        <UserLink user = {temp_id}/>
        <br/>
        <EvaluationLink evaluation = {temp_id}/>
        <br/>
        <PaymentInfoLink paymentinfo = {temp_id}/>
        <br/>
        <AdmissionLink admission = {temp_id}/>
        </>
    )
}
//             <Button variant="primary" href={"/user/" + evaluation.id}> click me</Button>
