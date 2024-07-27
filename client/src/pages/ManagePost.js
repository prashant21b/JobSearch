import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../url'
import UserContext from '../Context/user'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
export const ManagePost = () => {
    const [posts,setPosts]=useState([])
    const [state,setState]=useContext(UserContext)
    const token=state.token
    const getPosts=async()=>{
        try{
                     const response=await axios.get(`${baseUrl}/jobs/getuserpost`,{
                        headers:{
                             Authorization: `Bearer ${token}`
                        }
                     })
                   //  console.log(response)
                     setPosts(response.data.posts)
        }
        catch(error){
               console.log(error)
        }
    }

    useEffect(()=>{
           getPosts()
    },[])
    console.log(posts)
    const formatDate = (date) => {
       
        return moment(date).fromNow();
      };
  return (
    <div className='container'>
        {
            posts.map((post)=>{
                return(
                    <div className="job-card">
                    <div className="job-card-header">
                      <div className="job-card-info">
                        <h2 className="job-card-title">{post.title}</h2>
                        {/* <a href={companyUrl} className="job-card-company">{companyName}</a> */}
                      </div>
                      
                      <div className="job-card-details">
                      <div className="job-card-skills">
                      {post.skills.map(skill => (
                        <span key={skill} className="job-card-skill">{skill}</span>
                      ))}
                    </div>
                        <p className="job-card-date">{formatDate(post.postedOn)} | {post.type} | {post.location}</p>
                        <Link className="job-card-check">Delete</Link>
                      </div>
                    </div>
                      
                  </div>
                )
            })
        }

    </div>
  )
}
