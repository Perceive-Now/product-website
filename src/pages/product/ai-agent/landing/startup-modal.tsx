import React from "react";
import { useState, useEffect } from "react";
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from "react-joyride";
import RightArrow from "src/components/icons/common/right-arrow";
import handClock from "../../../../components/icons/home-images/48hourDelivery.svg";
import targetPaper from "../../../../components/icons/home-images/ContextRichness.svg";
import bulbIcon from "../../../../components/icons/home-images/HyperTailored.svg";
import aimDart from "../../../../components/icons/home-images/AI.svg";
import bulbMagni from "../../../../components/icons/home-images/ZeroHaul.svg";
import joyride1 from "./_assets/joyride-img-1.png"
import joyride2 from "./_assets/joyride-img-2.png"
import joyride3 from "./_assets/joyride-img-3.png"
import joyride4 from "./_assets/joyride-img-4.png"
import joyride5 from "./_assets/joyride-img-5.png"

const steps = [
    {
      target: ".sidebar-home",
      disableBeacon: true,
      hideCloseButton:true,    
      content: (
        <div className="max-w-sm rounded-lg overflow-hidden bg-white text-left">
            <img
                className="w-full h-20 object-cover"
                src={joyride1}
                alt="Joyride"
            />
            <div className="p-3 pb-0">
                <h2 className="text-base font-semibold text-secondary-800 mb-2">Home – Meet Your AI Agents</h2>
                <p className="text-secondary-800 text-sm">
                This is your starting point! Here, you’ll find AI Agents that are ready to help you with different tasks. Whether you're researching startups, planning fundraising strategies, or handling legal compliance, there's an agent for you.
                </p>                
            </div>
            </div>
        ),
      placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
    }, 
    {
        target: ".sidebar-agent",
        disableBeacon: true,
        hideCloseButton:true,    
        content: (
          <div className="max-w-sm rounded-lg overflow-hidden bg-white text-left">
              <img
                  className="w-full h-20 object-cover"
                  src={joyride2}
                  alt="Joyride"
              />
              <div className="p-3 pb-0">
                  <h2 className="text-base font-semibold text-secondary-800 mb-2">AI Agents – Powering Your Business</h2>
                  <p className="text-secondary-800 text-sm">
                  Explore AI agents designed to support your company’s needs. Each agent specializes in a key area, from market strategy to legal compliance. Discover how they can enhance your workflow and decision-making.
                  </p>
                  
              </div>
              </div>
          ),
        placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
      }, 
      {
        target: ".sidebar-project",
        disableBeacon: true,
        hideCloseButton:true,    
        content: (
          <div className="max-w-sm rounded-lg overflow-hidden bg-white text-left">
              <img
                  className="w-full h-20 object-cover"
                  src={joyride3}
                  alt="Joyride"
              />
              <div className="p-3 pb-0">
                  <h2 className="text-base font-semibold text-secondary-800 mb-2">Project Hub – Keep Everything Organized</h2>
                  <p className="text-secondary-800 text-sm">
                  This is where you document and manage your projects. Whether you’re tracking progress, analyzing data, or creating reports, this hub helps keep everything structured and accessible.
                  </p>
                  
              </div>
              </div>
          ),
        placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
      },        
      {
        target: ".sidebar-scope",
        disableBeacon: true,
        hideCloseButton:true,    
        content: (
          <div className="max-w-sm rounded-lg overflow-hidden bg-white text-left">
              <img
                  className="w-full h-20 object-cover"
                  src={joyride4}
                  alt="Joyride"
              />
              <div className="p-3 pb-0">
                  <h2 className="text-base font-semibold text-secondary-800 mb-1">Scope of Work Drafts – Your Work, Saved</h2>
                  <p className="text-secondary-800 text-sm">
                  Ever start a report but need to come back to it later? That’s what this section is for! All your saved drafts live here, so you can pick up right where you left off.
                  </p>
                  
              </div>
              </div>
          ),
        placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
      },         
      {
        target: ".joy-profile",
        disableBeacon: true,
        hideCloseButton:true,    
        content: (
          <div className="max-w-sm rounded-lg overflow-hidden bg-white text-left">
              <img
                  className="w-full h-20 object-cover"
                  src={joyride5}
                  alt="Joyride"
              />
              <div className="p-3 pb-0">
                  <h2 className="text-base font-semibold text-secondary-800 mb-2">Profile – Personalize Your Experience</h2>
                  <p className="text-secondary-800 text-sm">
                  View and update your personal information here. Keep your profile details up to date!
                  </p>
                  
              </div>
              </div>
          ),
        placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
      }
    
  ];

export default function StartupModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [run, setRun] = useState(false);

    useEffect(() => {
        const modalShown = localStorage.getItem("modalShown");
        
        if (modalShown) {
          setIsOpen(true);
          localStorage.setItem("modalShown", "false");
        }else{
            setIsOpen(false);          
        }
      }, []);

      useEffect(() => {
        if (run) {
          setIsOpen(false);
        }
      }, [run]);

    const closeModal = () => setIsOpen(false);

    //if (!isOpen) return null;
  
  return (    
    <>
    
        

        {isOpen &&
        <>
        <div className="bg-[rgba(0,_0,_0,_0.6)] fixed top-0 bottom-0 left-0 right-0 z-20 flex"></div> 
      <div className="fixed top-10 left-1/2 bg-white -translate-x-1/2  z-20 rounded-2xl py-4 px-8 max-w-2xl 2xl:max-w-3xl overflow-auto w-full">        
        <div className="flex-1 w-full mx-auto flex flex-col justify-center items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col w-full">
             
              <h1 className="text-[36px] text-secondary-800 font-semibold mb-2 font-poppins">
                See the Future, Shape the Present.
              </h1>
              <p className="text-base leading-normal mb-1 font-nunito font-normal text-secondary-800">
                You bring us your intel. You tell us what you need. We torture the data, break it
                down, and make it confess to anything you need. We&apos;re excited for you to
                experience our solutions.
              </p>
              <p className="text-base leading-normal mb-6 font-nunito font-normal text-secondary-800">
                We are excited for you to experience our solutions.
              </p>
              <div className="flex flex-wrap max-w-[400px] mx-auto justify-center gap-2 mb-3 overflow-hidden">
                <div className="flex items-center gap-1">
                  <img src={targetPaper} alt="arrow-down" className="w-6 h-6" />
                  <p className="text-base font-secondary-800 font-nunito leading-tight">Context <br/>richness</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={bulbIcon} alt="arrow-down" className="w-6 h-6" />
                  <p className="text-base font-secondary-800 font-nunito leading-tight">Hyper <br/>tailored</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={handClock} alt="arrow-down" className="w-6 h-6" />
                  <p className="text-base font-secondary-800 font-nunito leading-tight">48-hour <br/>delivery</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={bulbMagni} alt="arrow-down" className="w-6 h-6" />
                  <p className="text-base font-secondary-800 font-nunito leading-tight">Zero <br/>hallucinations</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src={aimDart} alt="arrow-down" className="w-6 h-6" />
                  <p className="text-base font-secondary-800 font-nunito leading-tight">
                    AI transparency <br/>and Explainability
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                <div className="cursor-pointer start-btn"  onClick={() => setRun(true)}>
                  <div className="flex items-center justify-center border-4 bg-secondary-500  border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white font-bold">
                    Get Started
                    <RightArrow className="ml-1" />
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      }

      <Joyride 
        steps={steps} 
        run={run} 
        showProgress={false}        
        spotlightClicks={false} 
        disableOverlayClose ={false}
        hideCloseButton
        spotlightPadding={0}
        hideBackButton
        showSkipButton={true}
        continuous 
        styles={{           
        tooltipContainer: {
            padding: 0,
            margin: 0,
            textAlign:'left',
            borderRadius:8, 
        }, 
        tooltipContent:{
            padding:0,
        },
        tooltip: {
            padding: 0,
            margin: 0,
            boxShadow: 'none',
        },
        tooltipFooter:{
            padding:'0 24px 24px',
            gap:'8px', 
        }, 
        tooltipFooterSpacer:{
            flex:0,
        },
        buttonSkip:{
            
            backgroundColor:'#fff',
            color:'#222',
            padding:'8px 16px',
            borderRadius:'40px',
            border:'1px solid #D5D5D5',
            fontSize:'14px',
            fontWeight:'semibold',
            flex:'auto',
            whiteSpace:'nowrap',
        },
        buttonNext: {
            backgroundColor:'#fff',
            color:'#222',
            padding:'8px 16px',
            borderRadius:'40px',
            border:'1px solid #222',
            fontSize:'14px',
            fontWeight:'semibold',
            whiteSpace:'nowrap',
        }
         
        }}
        locale={{
            last: 'Finish Tour',
            skip: 'Skip Tour',
          }}
    />
    </>
  );
}
