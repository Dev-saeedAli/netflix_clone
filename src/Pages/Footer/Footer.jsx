import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai"
import { AiOutlineInstagram } from "react-icons/ai"
import { AiOutlineTwitter } from "react-icons/ai"
import { AiOutlineYoutube } from "react-icons/ai"
import "../Footer/Footer.css"

function Footer() {
      const navList = ["Audio and subtitiles","Press","Privacy", "Contact us","Service code"];
      const policies = ["Decriptive Audio","Relationship with Investors","Legal Notices"];
      const helper = ["Help Center","Careers","Cookies Preference"];
      const terms = ["Gift Cards","Terms and Conditions","Coperative Information"];

      let row1 = navList.map((nav, index)=>{
                return (
              
                  <ul key={index}>
                    <li >{nav}</li>
                  </ul>
        
                  )});
      let row2 = policies.map((policy, index)=>{
                return (
              
                    <ul key={index}>
                      <li >{policy}</li>
                    </ul>
                
                  )});
      let row3 = helper.map((help, index)=>{
                return (
              
                    <ul key={index}>
                      <li >{help}</li>
                    </ul>
                
                  )});
      let row4 = terms.map((term, index)=>{
                return (
              
                    <ul key={index}>
                      <li >{term}</li>
                    </ul>
                
                  )});
  return (
    <>
      <footer className="footer_container" style={{display: "flex"}}>
          <div className='footer-row'>
            <AiOutlineFacebook/>
            <AiOutlineInstagram/>
            <AiOutlineTwitter/>
            <AiOutlineYoutube/>
            <div className="navLinks">
            <div className="links">{row1}</div>
            <div className="links">{row2}</div>
            <div className="links">{row3}</div>
            <div className="links">{row4}</div>
            </div>
               <span className='span'>@1997-2022 Netflix Clone.Inc</span>
          </div>

      </footer>
    </>
  )
}

export default Footer
