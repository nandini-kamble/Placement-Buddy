

document.getElementById("studentlogin").addEventListener("submit", function(e) {
        
    e.preventDefault();

    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
      
    };
    console.log(data)
    async function getdata() {
      try {
        const response = await axios.post("http://127.0.0.1:7500/studentlogincheck", data); //student@gmail.com pass=student
    
        if (response.status === 200) {
          alert("Successful login");
          localStorage.setItem("studentToken", response.data.token);

        form.reset();
          window.location.href = "studenthome.html"
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Invalid email or password");
          form.reset();
        } else {
          alert("Something went wrong, please try again later!");
          form.reset();
        }
      }
    }
    
 getdata()

});
  
