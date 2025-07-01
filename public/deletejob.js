

document.getElementById("admindeletejob").addEventListener("submit", function(e) {
        
    e.preventDefault();

    const form = e.target;
    const data = {
      Jobid:form.JobId.value,
    };
console.log(data)

    async function getdata() {
      try {
                  const adminToken = localStorage.getItem("adminToken");

      const response=  await axios.delete(`http://127.0.0.1:7500/admin/deletejob/${data.Jobid}`,{
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      console.log(response)
      if(response.data.status===500) {
        alert("error in deleting")
      } else {
        alert("data deleted")
        form.reset();
      }
      } catch (error) {
        console.log(error)
      }
     }


getdata()
  });










//     console.log(data)
//     async function getdata(){    
//       const response=  await axios.delete(`http://127.0.0.1:9600/admin/deletejob/${data.JobId}`)
//       alert("Job Deleted")

//        console.log(response)
   
//    } 
//  getdata()

// });
  
