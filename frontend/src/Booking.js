import React from 'react'
import "./booking.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Train from './Train.jpg';
import Train2 from './Train2.jpg';
import { useState } from 'react';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as FaIcons from "react-icons/fa";
const Booking = () => {
    
    const[seatInfo,setSeatInfo]=useState([])
    const [warning, setwarning] = useState("");
    const [seats,setseats]=useState("");
    const [loader, setloader] = useState(false);
    const [success, setsuccess] = useState(false);
    const [ticket,setTicket] = useState(false)
    const [message,setmessage]=useState("");
    const [image1,setImage1]=useState(true);
    const [image2,setImage2]=useState(false);

    // window.addEventListener('resize',refresh)
    // function refresh(){
    //    const img1=document.getElementById('img1')
    //   const img2=document.getElementById('img2')
    //   if(window.innerWidth<500)
    //   {
    //     img2.classList.remove("active")
    //     img1.classList.add("active")
    //   }
    //   else if(window.innerWidth>500)
    //   {
        
    //     img1.classList.remove("active")
    //     img2.classList.add("active")

    //   }
    // }
    
 
    
      const submit =async(e)=>{
        e.preventDefault()
        if(seats>7)
        {
            alert("Maximum 7 seats can be booked only!!")
        }
       else if(seats<1)
        {
            alert("Choose 1 atleast")
        }
        else
        {
              
                setloader(true);
                const response = await fetch('https://trainbookingsystem-production.up.railway.app/book',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({seats})
        
                })
                const resp = await response.json()
        
                if(resp.error)
                {
                    setwarning(true)
                }
                setloader(false)
                setsuccess(resp.success)
                if(resp.success)
                {
                    setmessage(resp.message);
                    setSeatInfo(resp.data)
                }
                setTicket(resp.success)
                setTimeout(() => {
                    setsuccess(false)
                }, 2500);
                
                }
       
    }
   console.log("seat ka data",seatInfo)
      const download = () => {
    const doc = new jsPDF()
    doc.text("Ticket", 90, 10)
    doc.text(message,40,30)
    doc.text("Seats Booked",10,50)
    let i=1
    if(seatInfo) 
    {
        seatInfo.forEach((x)=>{
            i=i+20
          doc.text(x,i,60)
        })
        
  
    }
    autoTable(doc, { html: '#mytable' })
    doc.save('ticket.pdf')
  };
  return (
    <>
    <div className='main'>
   <div className="image">
  <img src={Train} className="img-fluid img1" id="img1" alt="Responsive image" ></img>
  
   <img src={Train2} className="img-fluid  img2"  id="img2"  alt="Responsive image" ></img>
    
   </div>

    <div className="content">
    <h1>Welcome to seat booking system</h1>
    <div className="form">
    <form>
  <div className="form-group">
    <label htmlFor="seat" className='label'>Enter Number of Seats</label>
    <input type="number" className="form-control" id="seat" aria-describedby="seatHelp" placeholder="1-7"  min={"1"} max={"7"} onChange={(e)=>setseats(e.target.value)}  />
  </div>
 <div className="buttons">

  <button type="submit" className="btn btn-primary" onClick={submit}>Book</button>
 {ticket &&  <button className="btn btn-danger ticket" type="button" onClick={download} >Download Ticket</button>}    
 </div>
</form>
    
    </div>


  
    </div>
   

     
    </div>
    {success && (
          <div className="container-fluid blacky">
            <div className="success">
              <div classNam="wrappertick">
                {" "}
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52">
                  {" "}
                  <circle
                    className="checkmark__circle"
                    cx={26}
                    cy={26}
                    r={25}
                    fill="none"
                  />{" "}
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            <h1 style={{color:"white"}}>Booking Successful</h1>
            </div>
          </div>
        )}
  {loader && 
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
          {warning && (
          <>
            <div className="container-fluid blacky"></div>
            <div className="warningmain">
              <div className="warning">
                <FaIcons.FaExclamationTriangle size={70} color="red" />

                <p>Sorry! Seats are not available</p>
                <button className="okay" onClick={() => setwarning(false)}>
                  Okay
                </button>
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default Booking