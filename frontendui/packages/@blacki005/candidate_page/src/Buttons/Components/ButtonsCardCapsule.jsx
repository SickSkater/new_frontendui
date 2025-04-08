import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ButtonsLink } from "./ButtonsLink"

/**
 * A specialized card component that displays an `ButtonsLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ButtonsLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `buttons` object.
 *
 * @component
 * @param {Object} props - The props for the ButtonsCardCapsule component.
 * @param {Object} props.buttons - The object representing the buttons entity.
 * @param {string|number} props.buttons.id - The unique identifier for the buttons entity.
 * @param {string} props.buttons.name - The display name for the buttons entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ButtonsCardCapsule } from './ButtonsCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const buttonsEntity = { id: 123, name: "Example Entity" };
 *
 * <ButtonsCardCapsule buttons={buttonsEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ButtonsCardCapsule>
 */
export const ButtonsCardCapsule = ({buttons, children, title=<><PersonFill /> <ButtonsLink buttons={buttons} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
