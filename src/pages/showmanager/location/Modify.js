import { useParams } from "react-router-dom";

const LocationModifyPage = () => {
    const {tno} = useParams()
    
    return (
            <div>Location {tno} Modify Page</div>
    );
}

export default LocationModifyPage;