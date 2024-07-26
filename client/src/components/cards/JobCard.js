import React,{useState} from 'react';
import './JobCard.css';
import {Button,Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ companyName, companyUrl, location, postedOn, title, type, skills, link }) => {
  const navigate=useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatDate = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diff = Math.floor((now - postedDate) / (1000 * 60)); // Difference in minutes
    return `${diff} min ago`;
  };

  return (
    <>
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-info">
          <h2 className="job-card-title">{title}</h2>
          {/* <a href={companyUrl} className="job-card-company">{companyName}</a> */}
        </div>
        
        <div className="job-card-details">
        <div className="job-card-skills">
        {skills.map(skill => (
          <span key={skill} className="job-card-skill">{skill}</span>
        ))}
      </div>
          <p className="job-card-date">{formatDate(postedOn)} | {type} | {location}</p>
          <a onClick={handleShow} className="job-card-check">Check</a>
        </div>
      </div>
        
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2>{title} @ {companyName}</h2>
        <p><strong>Posted on:</strong> {new Date(postedOn).toLocaleString()}</p>
        <p><strong>Job type:</strong> {type}</p>
        <p><strong>Job location:</strong> {location}</p>
        <p><strong>Job description:</strong> Amazin job, I'm telling ya</p>
        <p><strong>Company name:</strong> {companyName}</p>
        <p><strong>Company website:</strong> <a href={companyUrl}>{companyUrl}</a></p>
        <div className="modal-skills">
          <strong>Skills:</strong>
          {skills.map(skill => (
            <span key={skill} className="modal-skill">{skill}{','}</span>
          ))}
        </div>
        </Modal.Body>
        <Modal.Footer>
          
        <Button onClick={() => window.open(link, '_blank')} variant="primary">
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobCard;
