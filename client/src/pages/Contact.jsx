import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { MdPhoneIphone } from "react-icons/md";
import { FaRegFaceGrinHearts } from "react-icons/fa6";





const Contact = () => {
  return (
    <>
      <div className="bg-[url(back.jpg)] h-screen w-screen bg-cover bg-center ">
      <div>
        <h1 className=" text-white text-center pt-50 text-7xl font-bold font-serif">Contact us</h1>
      </div>

      <div className="bg-white gap-20  flex h-60 w-290 mt-20 ms-45 rounded-2xl items-center " >

        <div className="ms-30"> 
            <div className="relative start-30 text-5xl ">
                 <CiLocationOn />
            </div>
           
            <h2 className="font-extrabold ms-10 font-serif text-2xl">Physical Address</h2>
            <p>Lorem ipsum dolor sit amet, consectetur .</p>
        </div>
        <div> 
            <div className="relative start-28 text-4xl"><AiOutlineMail /></div>
            <h2 className="font-extrabold ms-10 font-serif text-2xl" >Email Address</h2>
            <p className="ms-15">example@gmial.com</p>
            <p className="ms-18">info@gmail.com</p>
        </div>
         <div> 
            <div className="relative start-28 text-5xl"><MdPhoneIphone /></div>
            <h2 className="font-extrabold  ms-10 font-serif text-2xl" >Phone Number</h2>
            <p className="ms-18">+1616-6116-7989</p>
            <p className="ms-18">+1516-4614-4146</p>
        </div>
      </div>




       <div className="bg-black">
           <div className="bg-black-50  flex h-160 w-250 ms-60 mt-30">
                <div className="bg-amber-300 h-full w-full">
    
                 </div>

                 <div className="bg-amber-950 h-full w-full">

                    <div className=" ms-10 mt-25">
                        <h1 className="text-white text-5xl font-serif mb-5 ">Let's Chat</h1>
                        <input type="text"
                         placeholder=" Name"
                         className="text-black ps-3 text-2xl bg-amber-50 h-10 w-70 mt-10 rounded-2xl" />
                        <input type="text"
                         placeholder=" Email"
                         className="text-black ps-3 text-2xl bg-amber-50 h-10 w-70 mt-10 rounded-2xl" />
                        <input type="text"
                         placeholder="Buget"
                         className="text-black ps-3 text-2xl bg-amber-50 h-10 w-70 mt-10 rounded-2xl" />
                        <input type="text"
                         placeholder=" Message"
                         className="text-black ps-3 text-2xl bg-amber-50 h-10 w-70 mt-10 rounded-2xl" />
                         
                         <div className="  mt-20">
                            <button className="text-white h-10 w-40 rounded bg-blue-900">SEND MESSAGE</button>
                         </div>
                        
                    </div>

                 </div>
        
            </div>
        </div>

        <div>

            <div className="bg-[url(last.jpg)] h-screen w-screen bg-cover bg-center ">

                <div className="flex pt-50 ps-20 gap-30">
                    <div>
                        <h1 className="text-white text-3xl font-serif">Head Office</h1> br
                        <p className="text-white">Lorem ipsum dolor, sit amet consectetur  <br /> elit. Perferendis, maiores?</p> <br /> <br />
                        <p className="text-white">example@gmail.com</p>
                        <p className="text-white">+1656-6126-1666</p>
                        
                    </div>
                    <div>
                        <div className="text-white ms-69 mt-20 text-4xl mb-3"><FaRegFaceGrinHearts/></div>
                        <h1 className="text-white text-5xl ps-50 font-serif">Wedding</h1><br />
                        <h1 className="text-white text-2xl ps-15 font-serif">Lorem ipsum dolor sit amet consectetur.</h1> <br />
                        <p className="text-white">Lorem ipsum dolor,  sit amet consectetur sit amet consectetur adipisicing <br /> <span className="ms-20">elit. sit amet consectetur Perferendis, maiores?</span> </p>

                    </div>
                    <div className="relative left-40">
                        <h1 className="text-white text-3xl font-serif">Quick Links</h1>
                       <ul className="ms-22">
                        <li className="text-white ms-3">Services</li>
                        <li className="text-white ms-6">About</li>
                        <li className="text-white ms-5">Stories</li>
                        <li className="text-white relative right-2">Contact Us</li>
                      
                       </ul>

                    </div>
                </div>

            </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
