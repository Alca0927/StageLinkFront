import { useParams } from "react-router-dom";

const ShowModifyPage = () => {
    const {tno} = useParams()
    
    return (
            <div>Show {tno} Modify Page</div>
    );
}

export default ShowModifyPage;