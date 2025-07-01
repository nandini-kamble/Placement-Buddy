document.getElementById("btn").addEventListener("click", async () => {
    try {
                                    const studentToken = localStorage.getItem("adminToken");

      const response = await axios.get("http://127.0.0.1:7500/admin/studentapply",{
        headers: {
          Authorization: `Bearer ${studentToken}`
        }
      });
      console.log(response)
      const jobs = response.data;
      const tbody = document.getElementById("job-table-body");
  
      // Clear existing table rows
      tbody.innerHTML = "";
  
      // Iterate over each job and create table rows
      jobs.forEach(job => {
        const row = document.createElement("tr");
  
        const nameCell = document.createElement("td");
        nameCell.textContent = job.name;
        row.appendChild(nameCell);
  
        const emailCell = document.createElement("td");
        emailCell.textContent = job.email;
        row.appendChild(emailCell);
  
        const JobidCell = document.createElement("td");
        JobidCell.textContent = job.Jobid;
        row.appendChild(JobidCell);
  
        const EnrollmentCell = document.createElement("td");
        EnrollmentCell.textContent = job.Enrollment;
        row.appendChild(EnrollmentCell);
  
        const phoneCell = document.createElement("td");
        phoneCell.textContent = job.phone;
        row.appendChild(phoneCell);
  
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  });
  






// 