import { error } from 'console'
import {createConnection} from 'mysql2'


 export function createdbconnection()
{
    var conn=createConnection(
        {
        host:"localhost",
        user:"root",
        password:"cdac",
        database:"practice"
        }
        
    )


    conn.connect(error=>{
        if (error) {
          console.log("unsucessfullconnection")  
        } else {
            console.log("sucessfullconnection")  

        }
    })
    return conn
}