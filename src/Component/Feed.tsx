import axios from "axios"
import UserCard from "./UserCard"
import { Base_URL } from "../../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../../utils/feedSlice"
import { useEffect } from "react"

const Feed = () => {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()
    const getFeed = async () => {
        try{
            const res = await axios.get(Base_URL + "/user/feed",{withCredentials : true})  
            dispatch(addFeed(res?.data))
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        getFeed()
    },[])
    return(
        (feed &&  
        <UserCard user={feed?.[0]}/>
        )
    )
}
export default Feed;