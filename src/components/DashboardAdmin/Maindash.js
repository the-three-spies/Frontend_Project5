import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import axios from 'axios'
const Maindashboard = () => {
    const iconlist = [{ icon: <FaUser />, title: " User", class: "primary_a" },
    { icon: <BiTask />, title: " Donation Order", class: "warning_a" },
    { icon: <BsGraphUp />, title: "Needy Casese", class: "success_a" }
    ]
    const [counter, setCounter] = useState([])
    const [needyCase, setneedyCase] = useState([])
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const lastOrderForNeedy = async () => {
        try {
            const result = await (axios.get(`https://fetratinsandonationnewl.onrender.com/admin/lastcase`
            ))
            if (result.data.success) {
                setneedyCase(result.data.result);
                setStatus(true);
                setMessage("")
            }
            else { throw Error }
        }
        catch (error) {
            if (!error.response.data.success) {
                setStatus(false);
                setMessage(error.response.data.message);
              }

        }
    }
    //===============================================================
    const countinfo = async () => {
        try {
            const result = await (axios.get(`https://fetratinsandonationnewl.onrender.com/admin/counter`
            ))
            if (result.data.success) {
                setCounter(Object.values(result.data.result))
                const newCounter = (Object.values(result.data.result)).map((e, i) => {
                    return ({ ...e, iconName: iconlist[i].icon, title: iconlist[i].title, class: iconlist[i].class })

                })
                setCounter(newCounter)
                setStatus(true);
                setMessage("")

            }
            else { throw Error }
        }
        catch (error) {
            if (!error.response.data.success) {
                setStatus(false);
                setMessage(error.response.data.message);
              }

        }
    }
    //===============================================================
    useEffect(() => {
        countinfo();
        lastOrderForNeedy()


    }, [])
    //===============================================================

    return (
        <>
            <div className='main_dashbored'>
                <h1>Dashboard</h1>
                <div className="insight">
                    {counter && counter.map((Element, i) => {
                        return (
                            <diV key={i} className="card_info_data">
                                <span className={Element.class}>{Element.iconName}</span>
                                <h1>{Element.count}</h1>
                                    <h3>{Element.title} </h3>
                                <div className='text_muted'> Last 2minutes ago</div>
                            </diV>
                        )
                    })
                    }
                </div>

                <div className='latest_Case'>
                    <h1> Recent Needy Cases</h1>
                    <table>
                        <th>user Name</th> <th>Help Order </th><th> Name of Section </th> <th> Status of Order</th> <th> Amount Needed</th><th> Amount Donation</th> <th> Address</th>
                        {
                            needyCase && needyCase.map((element, i) => {
                                return (
                                    <tr><td>{element.firstname}</td> <td>{element.description}</td>
                                        <td>{element.title}</td><td>{element.statusdonation}</td> <td> {element.amount == 'null' ? '--' : element.amount}</td>
                                        <td> {element.donation_amount}</td>
                                        <td>{element.address} </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                    {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
                </div>
            </div>
        </>
    )
}

export default Maindashboard