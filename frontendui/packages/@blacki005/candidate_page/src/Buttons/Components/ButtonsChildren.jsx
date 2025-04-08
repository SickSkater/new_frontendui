import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ButtonsChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `buttons` entity along with other props to all child elements.
 * This component is useful for injecting a common `buttons` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ButtonsChildren component.
 * @param {any} props.buttons - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `buttons` entity.
 *
 * @example
 * // Example usage:
 * const buttonsEntity = { id: 1, message: "No data available" };
 *
 * <ButtonsChildren buttons={buttonsEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ButtonsChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'buttons' prop with the specified entity.
 */
export const ButtonsChildren = ({buttons, children, ...props}) => <ChildWrapper buttons={buttons} children={children} {...props} />