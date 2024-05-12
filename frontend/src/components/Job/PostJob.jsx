import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
//import { Job } from "../path/to/JobSchema"; // Import the Job model from your JobSchema file

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    country: "",
    city: "",
    location: "",
    jobType: "",
    experience: "",
    industry: "",
    description: "",
    responsibilities: "",
    qualifications: "",
    benefits: "",
    category: "",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
    applicationDeadline: "",
    contactInformation: "",
    companyOverview: "",
  });

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            {/* Input fields */}
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="wrapper">
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </div>
            ))}
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
