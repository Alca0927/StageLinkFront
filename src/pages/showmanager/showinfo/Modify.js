import { useParams } from "react-router-dom";

const ShowInfoModifyPage = () => {
    const {tno} = useParams()
    
    return (
            <div>Showinfo {tno} Modify Page</div>
    );
}

export default ShowInfoModifyPage;