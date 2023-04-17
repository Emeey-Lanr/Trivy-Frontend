

import { Request, Response } from "express"
import {pool} from "../db"
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
 export const signup = async (req: Request, res: Response) => {

     const  {username,password} = req.body
     try {
    //    Find if user exist
        const findUser = await pool.query("SELECT username FROM user_info WHERE username = $1", [username])
    
         if (findUser.rows.length > 0) {
             res.send({message:"Username already exist", status:false})

         } else {
            //hash the user password
             const hashedPasword = await brcypt.hash(password, 10)
            //  user db insertion
             const registerUser = await pool.query("INSERT INTO user_info(username, password) VALUES($1, $2)", [username, hashedPasword])
            //  token creation
             const userToken = await jwt.sign({ userId: username }, process.env.TKN, { expiresIn: "7d" })
             res.send({status:true, client_Token:userToken})

         }
         

     } catch (error: any) {
         console.log(error.message)
        
        
    }
    
    
}

export const signin = async (req: Request, res: Response) => {
    const message = (message:string,status:boolean) => {
     res.send({message:message,status:status})   
    }
    try {
        const{username, password} = req.body
        const findUser = await pool.query("SELECT * FROM user_info WHERE username = $1", [username])
       
        if (findUser.rows.length > 0) {
            const checkIfPassword = await brcypt.compare(password, findUser.rows[0].password)
            if (checkIfPassword) {
               const userToken = await jwt.sign({ userId:findUser.rows[0].username }, process.env.TKN, { expiresIn: "7d" })
                message(userToken, true)
                
            } else {
                 message("Invalid Password", false)
            }
            
        } else {
            message("Invalid login crendentails", false)
        }
    } catch (error:any) {
        console.log(error.message)
        
    }
    
}






// module.exports = {
//     signup,
//     signin
// }