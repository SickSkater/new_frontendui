import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an group entity.
 *
 * This component renders a label "GroupMediumContent" followed by a serialized representation of the `group` object
 * and any additional child content. It is designed to handle and display information about an group entity object.
 *
 * @component
 * @param {Object} props - The properties for the GroupMediumContent component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `group` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GroupMediumContent group={groupEntity}>
 *   <p>Additional information about the entity.</p>
 * </GroupMediumContent>
 */
export const GroupMediumEditableContent = ({group, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={group?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={group?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
