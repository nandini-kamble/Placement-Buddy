

document.getElementById("admincreatejob").addEventListener("submit", function(e) {
        
    e.preventDefault();

    const form = e.target;
    const data = {
        Jobid:form.JobId.value,
        Designation:form.Designation.value,
        ExperienceRequired:form.ExperienceRequired.value,
        salary:form.salary.value,
      
    };
    console.log(data);

async function getdata() {
  try {
        const adminToken = localStorage.getItem("adminToken");

    const response = await axios.post("http://127.0.0.1:7500/admin/createjob", data, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
    alert("New Job created");
    form.reset();
    console.log(response);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Duplicate jobId");
    } else {
      alert("An error occurred: " + (error.message || "Unknown error"));
    }
    console.error("Error during job creation:", error);
  }
}

getdata();


});
  
