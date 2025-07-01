

document.getElementById("studentRegisterForm").addEventListener("submit", function(e) {
        
    e.preventDefault();

    const form = e.target;
    const data = {
        name:form.name.value,
        email:form.email.value,
        Enrollment:form.Enrollment.value,
        Department:form.Department.value,
        password:form.password.value,
      
    };
    console.log(data);

async function getdata() {
  try {
    const response = await axios.post("http://127.0.0.1:7500/student/registration", data);
    alert("Registered");
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
  
