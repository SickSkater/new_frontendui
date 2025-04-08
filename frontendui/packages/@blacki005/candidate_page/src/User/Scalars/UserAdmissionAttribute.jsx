/**
 * A component for displaying the `admission` attribute of an user entity.
 *
 * This component checks if the `admission` attribute exists on the `user` object. If `admission` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `admission` attribute.
 *
 * @component
 * @param {Object} props - The props for the UserAdmissionAttribute component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {*} [props.user.admission] - The admission attribute of the user entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `admission` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const userEntity = { admission: { id: 1, name: "Sample Admission" } };
 *
 * <UserAdmissionAttribute user={userEntity} />
 */

import { AdmissionMediumContent } from "C:/Users/vojta/OneDrive/Plocha/new_frontendui/frontendui/packages/@blacki005/candidate_page/src/Admission/Components/AdmissionMediumContent"
export const UserAdmissionAttribute = ({admission}) => {
    const Admission = admission
    return (
        <>
        <AdmissionMediumContent admission={Admission} />
        </>
    )
}