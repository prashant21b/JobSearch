import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../url'
import UserContext from '../Context/user'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment';
import toast from 'react-hot-toast'
import { Spinner, Button } from 'react-bootstrap';

export const ManagePost = () => {
    const [posts, setPosts] = useState([])
    const [state, setState] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const token = state.token
    const navigate = useNavigate()

    const getPosts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${baseUrl}/jobs/getuserpost`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPosts(response.data.posts)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    const formatDate = (date) => {
        return moment(date).fromNow();
    };

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/jobs/deletepost/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                toast.success(response.data.msg)
                getPosts()
            } else {
                toast.error(response.data.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='container'>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                posts.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h3>No posts found</h3>
                       
                    </div>
                ) : (
                    posts.map((post) => (
                        <div className="job-card" key={post._id}>
                            <div className="job-card-header">
                                <div className="job-card-info">
                                    <h2 className="job-card-title">{post.title}</h2>
                                </div>
                                <div className="job-card-details">
                                    <div className="job-card-skills">
                                        {post.skills.map(skill => (
                                            <span key={skill} className="job-card-skill">{skill}</span>
                                        ))}
                                    </div>
                                    <p className="job-card-date">{formatDate(post.postedOn)} | {post.type} | {post.location}</p>
                                    <Link className="job-card-check" onClick={() => deleteHandler(post._id)}>Delete</Link>
                                </div>
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
    )
}
