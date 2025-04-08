import { createSlice } from '@reduxjs/toolkit';
import { CreateItem, DeleteItem } from './keyedreducers';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Slice for managing messages in the Redux store.
 * Provides actions and reducers to add, delete, and handle messages.
 */
const MsgSlice = createSlice({
    name: 'msgs',
    initialState: {},
    reducers: {
        msg_add: CreateItem,
        msg_delete: DeleteItem,
    },
});

export const MsgReducer = MsgSlice.reducer;
export const MsgActions = MsgSlice.actions;

/**
 * Displays a single toast message.
 *
 * @param {Object} msg - The message to display.
 * @param {string} [msg.id] - Unique identifier for the message.
 * @param {string} [msg.variant] - Bootstrap variant (e.g., 'success', 'danger').
 * @param {string} [msg.title] - The main content of the toast.
 */
const Msg = ({ msg }) => {
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(MsgActions.msg_delete(msg));
    };
    return (
        <Toast bg={msg.variant} onClose={onClose}>
            <Toast.Header />
            <Toast.Body>{msg?.title}</Toast.Body>
        </Toast>
    );
};

/**
 * Displays a list of toast messages using Bootstrap's `ToastContainer`.
 */
export const Msgs = () => {
    const msgs = useSelector((state) => state.msgs);
    return (
        <ToastContainer position="bottom-end">
            {Object.values(msgs).map((msg) => (
                <Msg key={msg.id} msg={msg} />
            ))}
        </ToastContainer>
    );
};

/**
 * Generates a unique identifier for a message.
 * @returns {string} A UUID string.
 */
const uuid = () => crypto.randomUUID();

/**
 * Adds a temporary flash message to the store, which is automatically removed after a delay.
 *
 * @param {Object} options - Options for the flash message.
 * @param {string} options.title - The title of the message.
 * @param {number} [options.delay=5000] - How long (in milliseconds) the message should persist.
 * @param {string} [options.variant="success"] - The variant of the message (e.g., 'success', 'danger').
 * @param {Array} [options.detail=[]] - Additional details for the message.
 * @returns {Function} A Redux thunk action.
 */
export const MsgFlashAction = ({ title, delay = 5000, variant = 'success', detail = [] }) => (dispatch) => {
    const msgWithId = { id: uuid(), variant, title, detail };
    setTimeout(() => dispatch(MsgActions.msg_delete(msgWithId)), delay);
    return dispatch(MsgActions.msg_add(msgWithId));
};

/**
 * Adds a persistent message to the store.
 *
 * @param {Object} options - Options for the message.
 * @param {string} options.title - The title of the message.
 * @param {string} [options.variant="danger"] - The variant of the message (e.g., 'success', 'danger').
 * @param {Array} [options.detail=[]] - Additional details for the message.
 * @returns {Function} A Redux thunk action.
 */
export const MsgAddAction = ({ title, variant = 'danger', detail = [] }) => (dispatch) => {
    const msgWithId = { id: uuid(), variant, title, detail };
    return dispatch(MsgActions.msg_add(msgWithId));
};

/**
 * Creates handlers to resolve or reject asynchronous GraphQL responses.
 *
 * @param {Object} reactions - Predefined success and error messages.
 * @param {string} reactions.success - Message title for a successful response.
 * @param {string} reactions.error - Message title for an error response.
 * @returns {Function} A function that takes a `dispatch` function and returns handlers for `then` and `catch`.
 */
export const CreateAsyncQueryValidator = (reactions) => (dispatch) => {
    const onResolve = (json) => {
        const data = json?.data;
        let result = data?.result;

        if (!result && Object.keys(data).length === 1) {
            const singleKey = Object.keys(data)[0];
            result = data[singleKey];
        }

        const typename = result?.__typename;
        if (!typename || typename.includes('Error')) {
            dispatch(MsgAddAction({ title: reactions.error, variant: 'danger', detail: 'Error in typename' }));
            return json;
        }

        dispatch(MsgFlashAction({ title: reactions.success, variant: 'success' }));
        return json;
    };

    const onReject = (error) => {
        dispatch(MsgAddAction({ title: reactions.error, variant: 'danger', detail: ['' + error] }));
        return error;
    };

    return [onResolve, onReject];
};

/**
 * Handles GraphQL response validation and dispatches success or error messages.
 *
 * @param {Object} reactions - Predefined success and error messages.
 * @returns {Function} A function that takes a GraphQL query promise and attaches validation handlers.
 */
export const CreateAsyncQueryValidator2 = (reactions) => (dispatch) => {
    const [onResolve, onReject] = CreateAsyncQueryValidator(reactions)(dispatch);
    return (future) => future.then(onResolve).catch(onReject);
};

/**
 * Inspects a GraphQL response for errors or success indicators and triggers appropriate reactions.
 *
 * @param {Object} reactions - Callback functions for different response scenarios.
 * @param {Function} [reactions.ok] - Called for successful responses.
 * @param {Function} [reactions.fail] - Called for failed responses or missing data.
 * @param {Function} [reactions.error] - Called for GraphQL errors (e.g., `errors` key).
 * @returns {Function} A function that takes a GraphQL response and processes it.
 */
export const CheckGQLError = (reactions) => (json) => {
    const errors = json?.errors;
    const data = json?.data;

    if (errors) {
        const errorReaction = reactions.errors || reactions.error || reactions.fail;
        errorReaction?.(json);
        return json;
    }

    let result = data?.result;
    if (!result && data && Object.keys(data).length === 1) {
        const singleKey = Object.keys(data)[0];
        result = data[singleKey];
    }

    const typename = result?.__typename;
    const msg = result?.msg;

    if (!typename || typename.includes('Error')) {
        reactions.error?.(json);
        return json;
    }

    reactions[msg]?.(json) || reactions.ok?.(json);
    return json;
};
