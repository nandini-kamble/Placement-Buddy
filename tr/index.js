import express,{request,response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {createConnection} from 'mysql2'
import { createdbconnection } from './dbconnection.js';
import {hashSync,compareSync} from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app=express();
app.use(cors());
const port=7500;
app.use(express.json())

const conn=createdbconnection();
function verifyToken(request, response, next)//middleware
{
    const authheader = request.get('Authorization')//get used to get value  of token from response header ie bearer + token vale
    if (authheader)//if token is there check it is valid go to next else show unauthorized
    {
        const token = authheader.split(" ")[1]//used to split token and bearer
        jwt.verify(token, "hello123", (error, payload) => {
            if (error) {
                response.status(StatusCodes.UNAUTHORIZED).send("token is invalid")

            }
            else {
                next();

            }
        })
    }
    else {
        response.status(StatusCodes.UNAUTHORIZED).send("token is missing")
    }
}

app.get("/admin",(request,response)=>
    {
        const qry='select * from admin' 
        conn.query(qry,(error,result)=>
        {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("no data")
    
            } else {
                response.status(StatusCodes.OK).send(result)
    
            }
        })
    })
    

app.post("/admin",(request,response)=>
    {
      try {
        const data=request.body;
        const encryptedpassword=hashSync(data.password,10)
        data.password=""
      const qry=`insert into admin values('${data.email}','${encryptedpassword}') `
    conn.query(qry,(error,result)=>
    {
        if (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
        } else {
            response.status(StatusCodes.OK).send("inserted")
        }
    })
      } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong")
    
      }
    
    })









app.post("/adminlogincheck", (request, response) => {
  try {
      const data = request.body;
      const qry = `select * from admin where email='${data.email}'`
      conn.query(qry, (error, result) => {
          if (error) {
              response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)

          } else {
              if (result.length === 0)//if email is invalid ie email valid nhi hai toh blank array dega
              {
                  response.status(StatusCodes.BAD_REQUEST).send("email is invalid")

              } else {

                if (compareSync(data.password,result[0].password)) 
                  {
                    const token=jwt.sign({email:result[0].email},"hello123");

                  response.status(StatusCodes.OK).send({message:"login successfull",token:token})

                } else {
                  response.status(StatusCodes.BAD_REQUEST).send("password is invalid")

                }
              }
          }
      })
  } catch (error) {
      console.log("error")
  }


})

//admintoken= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0Njc5NDQyMH0.0TRhaTsKGSqECWykS4adIROVBuKNCb6tALSapctFz0c



    app.get("/admin/jobs",verifyToken,(request,response)=>
        {
            const qry='select * from jobs' 
            conn.query(qry,(error,result)=>
            {
                if (error) {
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("no data")
        
                } else {
                    response.status(StatusCodes.OK).send(result)
        
                }
            })
        })
        


    app.post("/admin/createjob",verifyToken,(request,response)=>
        {
          try {
            const data=request.body;
          const qry=`insert into jobs values(${data.Jobid},'${data.Designation}','${data.ExperienceRequired}',${data.salary}) `
        conn.query(qry,(error,result)=>
        {
            if (error) {
                response.status(StatusCodes.BAD_REQUEST).send(error)
            } else {
                response.status(StatusCodes.OK).send("inserted")
            }
        })
          } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong")
        
          }
        
        })


        
        app.delete("/admin/deletejob/:id", verifyToken,(request,response) => {
          try {
              const id = request.params.id;
              const qry = `delete from jobs where Jobid=${id}`
              conn.query(qry, (error, result) => {
                  if (error) {
                  response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
                  } else {
                      response.status(StatusCodes.OK).send("data deleted")
                  }
              })
          } catch (error) {
              response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("data not deleted")
          }
      })
      
      
            
            //to update the data
            
            app.put("/admin/upadtejob/:id",verifyToken,(request,response)=>
            {
            try {
              const id= request.params.id
             
            const data=request.body
            const qry= `update jobs set Designation='${data.Designation}',ExperienceRequired='${data.ExperienceRequired}',salary=${data.salary} where Jobid=${id}`
            conn.query(qry,(error,result)=>
            {
              if (error) {
              response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("not updated the given data")
            
            } else {
              response.status(StatusCodes.OK).send(result)
            
            }
            
            })
            } catch (error) {
              response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong")
            
            }
            })
            
            

            app.post("/student/applyjob",verifyToken,(request,response)=>
              {
                try {
                  const data=request.body;
                const qry=`insert into applyforjob values('${data.name}','${data.email}',${data.Jobid},${data.Enrollment},${data.phone}) `
              conn.query(qry,(error,result)=>
              {
                  if (error) {
                      response.status(StatusCodes.BAD_REQUEST).send(error)
                  } else {
                      response.status(StatusCodes.OK).send("inserted")
                  }
              })
                } catch (error) {
                  response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong")
              
                }
              
              })
app.get("/admin/studentapply",(request,response)=>
        {
            const qry='select * from applyforjob ' 
            conn.query(qry,(error,result)=>
            {
                if (error) {
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("no data")
        
                } else {
                    response.status(StatusCodes.OK).send(result)
        
                }
            })
        })

        app.post("/student/registration",(request,response)=>
          {
            try {
              const data=request.body;
             const encryptedpassword= hashSync(data.password,10)
             data.password=" ";
            const qry=`insert into studentregistration values('${data.name}','${data.email}',${data.Enrollment},'${data.Department}','${encryptedpassword}') `
          conn.query(qry,(error,result)=>
          {
              if (error) {
                  response.status(StatusCodes.BAD_REQUEST).send(error)
              } else {
                  response.status(StatusCodes.OK).send("inserted")
              }
          })
            } catch (error) {
              response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("something went wrong")
          
            }
          
          })



          app.post("/studentlogincheck", (request, response) => {
            try {
                const data = request.body;
                const qry = `select * from studentregistration where email='${data.email}'`
                conn.query(qry, (error, result) => {
                    if (error) {
                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
          
                    } else {
                        if (result.length === 0)//if email is invalid ie email valid nhi hai toh blank array dega
                        {
                            response.status(StatusCodes.BAD_REQUEST).send("email is invalid")
          
                        } else {
          
                          if (compareSync(data.password,result[0].password)) 
                            {
                              const token=jwt.sign({email:result[0].email},"hello123");

                            response.status(StatusCodes.OK).send({message:"login successfull",token:token})
          
                          } else {
                            response.status(StatusCodes.BAD_REQUEST).send("password is invalid")
          
                          }            //"tokenstudent": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwiaWF0IjoxNzQ2Nzg2NTEyfQ.djBprIjJfu-nMvvV8FDtG6fIblv8HGXKqWIh9TB0fHA"
                        }
                    }
                })
            } catch (error) {
                console.log("error")
            }
          
          
          })
          
          

app.listen(port,()=>
{
    console.log(`server is running on port${port}`)
})