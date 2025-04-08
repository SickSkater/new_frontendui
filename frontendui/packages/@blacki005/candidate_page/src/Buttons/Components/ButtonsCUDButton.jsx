import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { ButtonsDeleteAsyncAction, ButtonsInsertAsyncAction, ButtonsUpdateAsyncAction } from "../Queries";
import { ButtonsMediumEditableContent } from "./ButtonsMediumEditableContent";

/**
 * ButtonsCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertButtonsButton` for creating a new item (operation "C")
 * - `UpdateButtonsButton` for updating an existing item (operation "U")
 * - `DeleteButtonsButton` for deleting an existing item (operation "D")
 *
 * This component validates the `buttons` prop:
 * - For "C" (create), `buttons` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `buttons` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `buttons` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the ButtonsCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.buttons - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.buttons.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.buttons.name] - The name of the item (optional).
 * @param {string} [props.buttons.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(buttons) => {}] - Callback executed after the operation completes. Receives the `buttons` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <ButtonsCUDButton
 *         operation="C"
 *         buttons={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </ButtonsCUDButton>
 *
 *       <ButtonsCUDButton
 *         operation="U"
 *         buttons={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </ButtonsCUDButton>
 *
 *       <ButtonsCUDButton
 *         operation="D"
 *         buttons={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </ButtonsCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const ButtonsButton = ({ operation, children, buttons, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: ButtonsInsertAsyncAction,
            dialogTitle: "Vložit novou buttons",
            loadingMsg: "Vkládám novou buttons",
            renderContent: () => <ButtonsMediumEditableContent buttons={buttons} />,
        },
        U: {
            asyncAction: ButtonsUpdateAsyncAction,
            dialogTitle: "Upravit buttons",
            loadingMsg: "Ukládám buttons",
            renderContent: () => <ButtonsMediumEditableContent buttons={buttons} />,
        },
        D: {
            asyncAction: ButtonsDeleteAsyncAction,
            dialogTitle: "Chcete odebrat buttons?",
            loadingMsg: "Odstraňuji buttons",
            renderContent: () => (
                <h2>
                    {buttons?.name} ({buttons?.name_en})
                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, buttons, { deferred: true });
    const handleClick = async (params = {}) => {
        const fetchParams = { ...buttons, ...params };
        const freshButtons = await fetch(fetchParams);
        onDone(freshButtons); // Pass the result to the external callback
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !buttons?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'buttons' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={buttons}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// ButtonsCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     buttons: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `buttons` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// ButtonsCUDButton.defaultProps = {
//     onDone: () => {},
// };