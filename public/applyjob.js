

document.getElementById("JobApply").addEventListener("submit", function (e) {

  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    Jobid: form.Jobid.value,
    Enrollment: form.Enrollment.value,
    phone: form.phone.value,


  };
  console.log(data);

  async function getdata() {
    try {
      const studentToken = localStorage.getItem("studentToken");
      const response = await axios.post("http://127.0.0.1:7500/student/applyjob", data, {
        headers: {
          Authorization: `Bearer ${studentToken}`
        }
      });
      alert("Applied");
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

