import React, { useState, useEffect } from 'react'
import Share from "../share/Share"
import Post from '../post/Post'
import './feed.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"

const Feed = ({username}) => {
const [posts,setPosts] = useState([]);
const user = useContext(AuthContext)
console.log(user)
console.log("feed" , user._id);
const fetchPosts = async() => {
    const res = username ? await axios.get("/posts/profile/"+username ) :
     await axios.get("/posts/timeline/"+user._id)
    setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
    }))
}
    
    useEffect(() => {
        fetchPosts()
    }, [username,user._id])
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map((p)=>(
                 <Post key={p._id} post={p}/>))}
                
                
            </div>
            
        </div>
    )
}

export default Feed
