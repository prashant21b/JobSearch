import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/user';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Button, Form, Modal } from 'react-bootstrap';
import { baseUrl } from '../url';
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate()
  const [state, setState] = useContext(UserContext)
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: '',
    location: '',
    companyName: '',
    companyUrl: '',
    skills: [],
    link: '',
    deadline:'',
    jobDescription: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'skills') {
      // Split skills by comma and trim whitespace
      setFormData({ ...formData, [name]: value.split(',').map(skill => skill.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

   const token=state.token
   console.log(token)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    try {
      // Send the formData to the backend
      const response = await axios.post(`${baseUrl}/jobs/createjob`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
        }
        }
      );
      console.log('Response from server:', response);

      if (response.status === 201) {
        toast.success('Job posted successfully');
        handleClose(); // Close the modal
        setFormData({
          id: '',
          title: '',
          type: '',
          location: '',
          companyName: '',
          companyUrl: '',
          skills: [],
          link: '',
          deadline: '',
          jobDescription: ''
        });
      } else {
        toast.error('Failed to post job');
      }
    } catch (error) {
      console.log('Error during request:', error);
      toast.error('Error posting job');
    }
  };


  useEffect(() => {
    // Check login status (example logic, adjust according to your auth logic)
    console.log(localStorage.getItem("Auth"))
    const checkLoginStatus = () => {
      if (localStorage.getItem("Auth")) {
        setIsLogin(true)
      }
      else {
        setIsLogin(false)
      }
    };

    checkLoginStatus();
  }, [state]);

  const logoutHandler = () => {
    localStorage.removeItem("Auth")
    setState({
      user: {},
      token: ""
    })
    toast.success('Logout sucessfully')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <div onClick={() => navigate('/')} className="navbar-text">Job Search</div>
        <div className={`navbar-buttons ${menuOpen ? 'show' : ''}`}>
          {isLogin ? (
            <>
              <button onClick={logoutHandler} className="navbar-button">Logout</button>
              <button className="navbar-button" onClick={handleShow}>Post</button>
              <button className="navbar-button" onClick={() => navigate('/manage')}>Manage</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="navbar-button">Login</button>
              <button onClick={() => navigate('/signup')} className="navbar-button">Signup</button>
            </>
          )}
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>



      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign:"center"}}>Post New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="Enter job ID"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter job title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                placeholder="Enter job type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter job location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyUrl">
              <Form.Label>Company URL</Form.Label>
              <Form.Control
                type="url"
                name="companyUrl"
                placeholder="Enter company URL"
                value={formData.companyUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                name="skills"
                placeholder="Enter required skills separated by commas (max 5 skills)"
                value={formData.skills.join(', ')}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLink">
              <Form.Label>Job Link</Form.Label>
              <Form.Control
                type="url"
                name="link"
                placeholder="Enter job link"
                value={formData.link}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formJobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="jobDescription"
                placeholder="Enter job description"
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDeadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                placeholder="Select deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* <Button variant="primary" type="submit">
                Submit
            </Button> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
};

export default Navbar;
