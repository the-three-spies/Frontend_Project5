import { Link } from 'react-router-dom'
import axios from "axios"
import "./style.css"
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
//===============================================================

const NeedCase = () => {
    const [needyCase, setneedyCase] = useState([])
    const [message, setMessage] = useState("");
    const AllOrderForNeedy = async () => {
        try {
            const result = await (axios.get(`http://localhost:5000/needycase/`
            ))

            if (result.data.success) {
                setneedyCase(result.data.result)


            }
            else { throw Error }
        }
        catch (error) {
            {

                setMessage(error.response.data.message)
            }

        }
    }
    //===============================================================


    useEffect(() => {
        AllOrderForNeedy()

    }, [])


    return (
        <>
       
            <div className='container_tabel'>
            <h1>All Needy Cases</h1>
            <table>
                <tr></tr><th># num </th> <th>user Name</th> <th>Help Order </th> <th> Section Name </th> <th> Status of Order</th> <th> Amount Needed</th><th> Amount Donation</th><th> Reset</th> <th> Address</th>  <th> Address</th> 
               

                {
                    needyCase && needyCase.map((element, i) => {
                        return (
                            <tr><td>{i}</td><td>{element.firstname}</td> <td>{element.description}</td>
                                <td>{element.title}</td><td>{element.statusdonation}</td> <td> {element.amount=='null'?'--':element.amount}</td>
                                <td> {element.donation_amount}</td> <td> {element.rest}</td>
                                <td>{element.address} </td>
                            </tr>
                        )
                    })
                }
                
            </table>

</div>
        </>
    )
}



export default NeedCase;