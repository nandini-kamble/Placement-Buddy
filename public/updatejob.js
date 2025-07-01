

document.getElementById("adminupdatejob").addEventListener("submit", function(e) {
        
    e.preventDefault();

    const form = e.target;
    const data = {
        Jobid:form.JobId.value,
        Designation:form.Designation.value,
        ExperienceRequired:form.ExperienceRequired.value,
        salary:form.salary.value,
    };
   //console.log(data)

   async function getdata() {
    try {
                        const adminToken = localStorage.getItem("adminToken");

      const response = await axios.put(`http://127.0.0.1:7500/admin/upadtejob/${data.Jobid}`,data,{
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      alert("Job Upadted");
      form.reset();
      console.log(response);
    } catch (error) {
      
      console.error("Error during job creation:", error);
    }
  }


    
 getdata()

});
  
