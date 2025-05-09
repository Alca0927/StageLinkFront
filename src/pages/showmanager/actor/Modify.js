import { useParams } from "react-router-dom";

const ActorModifyPage = () => {
    const {tno} = useParams()
    
    return (
            <div>Actor {tno} Modify Page</div>
    );
}

export default ActorModifyPage;