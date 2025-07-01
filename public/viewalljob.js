document.getElementById("btn").addEventListener("click", async () => {
    try {
                              const studentToken = localStorage.getItem("studentToken");


      const response = await axios.get("http://127.0.0.1:7500/admin/jobs",{
        headers: {
          Authorization: `Bearer ${studentToken}`
        }
      });
      const jobs = response.data;
      const tbody = document.getElementById("job-table-body");
  
      // Clear existing table rows
      tbody.innerHTML = "";
  
      // Iterate over each job and create table rows
      jobs.forEach(job => {
        const row = document.createElement("tr");
  
        const jobIdCell = document.createElement("td");
        jobIdCell.textContent = job.Jobid;
        row.appendChild(jobIdCell);
  
        const designationCell = document.createElement("td");
        designationCell.textContent = job.Designation;
        row.appendChild(designationCell);
  
        const experienceCell = document.createElement("td");
        experienceCell.textContent = job.ExperienceRequired;
        row.appendChild(experienceCell);
  
        const salaryCell = document.createElement("td");
        salaryCell.textContent = job.salary;
        row.appendChild(salaryCell);
  
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  });
  