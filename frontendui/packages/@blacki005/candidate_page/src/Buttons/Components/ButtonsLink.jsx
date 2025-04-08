import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const ButtonsURI = `/buttons/buttons/view/`;

/**
 * A React component that renders a `ProxyLink` to an "buttons" entity's view page.
 *
 * The target URL is dynamically constructed using the `buttons` object's `id`, and the link displays
 * the `buttons` object's `name` as its clickable content.
 *
 * @function ButtonsLink
 * @param {Object} props - The properties for the `ButtonsLink` component.
 * @param {Object} props.buttons - The object representing the "buttons" entity.
 * @param {string|number} props.buttons.id - The unique identifier for the "buttons" entity. Used to construct the target URL.
 * @param {string} props.buttons.name - The display name for the "buttons" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "buttons" entity's view page.
 *
 * @example
 * // Example usage with a sample buttons entity:
 * const buttonsEntity = { id: 123, name: "Example Buttons Entity" };
 * 
 * <ButtonsLink buttons={buttonsEntity} />
 * // Renders: <ProxyLink to="/buttons/buttons/view/123">Example Buttons Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/buttons/buttons/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ButtonsLink = ({buttons, ...props}) => {
    return <ProxyLink to={ButtonsURI + buttons.id} {...props}>{buttons.name}</ProxyLink>
}