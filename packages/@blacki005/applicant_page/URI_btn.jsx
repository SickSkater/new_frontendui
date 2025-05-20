import { useNavigate } from "react-router";
export const uri_btn = (item, uri, btn_text) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(uri + item.id); // Replace with your desired path
    };

    return (
        <button onClick={handleClick}>
        {btn_text}
        </button>
    );
}