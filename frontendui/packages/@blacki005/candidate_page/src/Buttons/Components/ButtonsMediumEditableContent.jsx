import { Input } from "@hrbolek/uoisfrontend-shared"

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
export const ButtonsMediumEditableContent = ({buttons, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={buttons?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={buttons?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
