import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ButtonsCardCapsule } from "./ButtonsCardCapsule"
import { ButtonsMediumCard } from "./ButtonsMediumCard"

/**
 * A large card component for displaying detailed content and layout for an buttons entity.
 *
 * This component wraps an `ButtonsCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ButtonsMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ButtonsLargeCard component.
 * @param {Object} props.buttons - The object representing the buttons entity.
 * @param {string|number} props.buttons.id - The unique identifier for the buttons entity.
 * @param {string} props.buttons.name - The name or label of the buttons entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const buttonsEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ButtonsLargeCard buttons={buttonsEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ButtonsLargeCard>
 */
export const ButtonsLargeCard = ({buttons, children}) => {
    return (
        <ButtonsCardCapsule buttons={buttons} >
            <Row>
                <MiddleColumn>
                <ButtonsMediumCard buttons={buttons}/>
                </MiddleColumn>
            </Row>
        </ButtonsCardCapsule>
    )
}
