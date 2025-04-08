import { AsyncClickHandler, ButtonWithDialog, Input } from '@hrbolek/uoisfrontend-shared';
import { StateMachineInsertAsyncAction } from './Queries/StateMachineInsertAsyncAction';
import { StateMachineDeleteAsyncAction } from './Queries/StateMachineDeleteAsyncAction';

/**
 * InsertStateMachineButton Component
 *
 * A reusable button component for inserting a new "statemachine" into the system. It uses a dialog
 * for collecting necessary inputs and executes an asynchronous action upon confirmation.
 * 
 * This component integrates with `AsyncClickHandler` to manage asynchronous actions, 
 * and `ButtonWithDialog` for rendering a dialog interface. It also utilizes the `Input` 
 * component for rendering form fields dynamically based on the `params` prop.
 *
 * @component
 * @param {Object} props - The props for the InsertStateMachineButton component.
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} [props.params={}] - The initial parameters for the statemachine insertion action. 
 *                                      Contains default values for the dialog inputs.
 * @param {string} [props.params.name] - The default value for the "Název" field.
 * @param {string} [props.params.name_en] - The default value for the "Anglický název" field.
 * @param {Function} [props.onDone=(newStateMachine) => null] - Callback executed after the statemachine is successfully inserted.
 *                                                      Receives the new statemachine as an argument.
 * @param {...Object} props - Additional props passed to the `ButtonWithDialog` component.
 *
 * @example
 * // Basic Usage
 * const Example = () => {
 *     const handleStateMachineInserted = (newStateMachine) => {
 *         console.log("StateMachine inserted:", newStateMachine);
 *     };
 *
 *     return (
 *         <InsertStateMachineButton
 *             params={{ name: "Default Name", name_en: "Default English Name" }}
 *             onDone={handleStateMachineInserted}
 *         >
 *             Add New StateMachine
 *         </InsertStateMachineButton>
 *     );
 * };
 *
 * @returns {JSX.Element} A button that opens a dialog for inserting a new statemachine.
 */
export const DeleteStateMachineButton = ({ children, statemachine, onDone = (statemachine) => null, ...props }) => {
    return (
        <AsyncClickHandler
            asyncAction={StateMachineDeleteAsyncAction}
            defaultParams={statemachine}
            loadingMsg={"Odstraňuji část"}
            onClick={() => onDone(statemachine)}
        >
            <ButtonWithDialog buttonLabel={children} dialogTitle="Chcete odebrat část?" {...props} params={statemachine}>
                <h2>{statemachine?.name} ({statemachine?.nameEn})</h2>
            </ButtonWithDialog>
        </AsyncClickHandler>
    );
};
