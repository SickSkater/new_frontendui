import { PersonFill } from "react-bootstrap-icons"
import { ButtonsLink } from "./ButtonsLink"
import { ButtonsCardCapsule } from "./ButtonsCardCapsule"
import { ButtonsMediumContent } from "./ButtonsMediumContent"

/**
 * A card component that displays detailed content for an buttons entity.
 *
 * This component combines `ButtonsCardCapsule` and `ButtonsMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the buttons entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ButtonsMediumCard component.
 * @param {Object} props.buttons - The object representing the buttons entity.
 * @param {string|number} props.buttons.id - The unique identifier for the buttons entity.
 * @param {string} props.buttons.name - The name or label of the buttons entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const buttonsEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ButtonsMediumCard buttons={buttonsEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ButtonsMediumCard>
 */
export const ButtonsMediumCard = ({buttons, children}) => {
    return (
        <ButtonsCardCapsule title="Výběr stránky">
            <ButtonsMediumContent buttons={buttons}>
                {children}
            </ButtonsMediumContent>
        </ButtonsCardCapsule>
    )
}
