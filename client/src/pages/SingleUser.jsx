import { QUERY_NAME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const SingleUser = () => {  
const { loading: nameLoading, data: nameData } = useQuery(QUERY_NAME);
const { userId, fullName } = useParams();
const name = nameData?.getName || {};
console.log("nameData", nameData)
console.log("name", name)
console.log("name.fullName", name.fullName)

    return (
        <div>
        <h1>{name.fullName}</h1>
        </div>
    )
    }  

export default SingleUser;
