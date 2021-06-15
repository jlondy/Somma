import '../App.css';
import Container from '@material-ui/core/Container';
import Bubbles from './visualizations/bubbles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect} from "react";
import { gsap } from "gsap/all";
import {Power4, Bounce} from "gsap";

function Landing() {
    React.useEffect(() => {
        const timeline = gsap.timeline();
        
        timeline.from(".single-grape-landing", {
          stagger: 0.1,
          scale: 0,
          duration: 2,
          ease: Bounce.easeOut
        });

      }, [])

    return (
        // LANDING PAGE
        <Container className="bodyComponent">
            <div className="leftSide">
                <div>
                    <Typography className="header-text" variant="h2">Advancing Inspiring Wine Ethusiasts</Typography>
                    <Typography className="sub-header-text" variant="h6">Come view and explore over 50 thousand records of wines stretching across our world, reviewed by some of the best tasters.</Typography>
                </div>
                <svg width="50%" height="50%" viewBox="0 0 567.055 706.794">
                    <defs>
                        <filter id="Ellipse_8" x="43.055" y="194.794" width="218" height="234" filterUnits="userSpaceOnUse">
                        <feOffset dy="25" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Path_3" x="223.63" y="101.739" width="205.708" height="166.018" filterUnits="userSpaceOnUse">
                        <feOffset dy="15" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-2"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-2"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Path_2" x="0" y="0" width="296.158" height="418.622" filterUnits="userSpaceOnUse">
                        <feOffset dy="25" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-3"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-3"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Ellipse_2" x="43.055" y="324.794" width="218" height="219" filterUnits="userSpaceOnUse">
                        <feOffset dy="10" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-4"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-4"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Ellipse_4" x="308.055" y="487.794" width="218" height="219" filterUnits="userSpaceOnUse">
                        <feOffset dy="10" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-5"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-5"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Ellipse_5" x="349.055" y="344.794" width="218" height="224" filterUnits="userSpaceOnUse">
                        <feOffset dy="15" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-6"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-6"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Ellipse_3" x="175.055" y="415.794" width="218" height="224" filterUnits="userSpaceOnUse">
                        <feOffset dy="15" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-7"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-7"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                        <filter id="Ellipse_6" x="199.055" y="270.794" width="218" height="224" filterUnits="userSpaceOnUse">
                        <feOffset dy="15" input="SourceAlpha"/>
                        <feGaussianBlur stdDeviation="3" result="blur-8"/>
                        <feFlood flood-opacity="0.161"/>
                        <feComposite operator="in" in2="blur-8"/>
                        <feComposite in="SourceGraphic"/>
                        </filter>
                    </defs>
                    <g className="single-grape" id="Group_1" data-name="Group 1" transform="translate(-1083.945 -211.206)">
                        <g className="single-grape-landing" id="Ellipse_9" data-name="Ellipse 9" transform="translate(1292 340)" fill="#903de2" stroke="#000" stroke-width="6">
                        <circle cx="100" cy="100" r="100" stroke="none"/>
                        <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        <g className="single-grape-landing" id="Ellipse_7" data-name="Ellipse 7" transform="translate(1392 406)" fill="#903de2" stroke="#000" stroke-width="6">
                        <circle cx="100" cy="100" r="100" stroke="none"/>
                        <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Ellipse_8)">
                        <g className="single-grape-landing" id="Ellipse_8-2" data-name="Ellipse 8" transform="translate(52.05 194.79)" fill="#903de2" stroke="#000" stroke-width="6">
                            <circle cx="100" cy="100" r="100" stroke="none"/>
                            <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Path_3)">
                        <path id="Path_3-2" data-name="Path 3" d="M-2852.68,1134c28.892-39.263,30.807-76.063,53.536-95.9,66.811-58.3,128.471-35.933,128.471-35.933s-8.538,65.926-58.61,104.379c-27.628,21.217-78.452,20.454-123.4,27.451" transform="translate(3087.73 -893.21)" fill="#03b160" stroke="#000" stroke-width="6"/>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Path_2)">
                        <path id="Path_2-2" data-name="Path 2" d="M-2644.643,461.613c183.865,178.488,111.43,322.836,111.43,322.836h31.421s16.35-46.007,13.7-108.425c-4.1-96.619-74.591-242.659-139.36-232.695-40.2,6.185-17.566,15.259-17.19,18.284Z" transform="translate(2352.78 -1263.16) rotate(-20)" fill="#583a3c" stroke="#000" stroke-width="6"/>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Ellipse_2)">
                        <g className="single-grape-landing" id="Ellipse_2-2" data-name="Ellipse 2" transform="translate(52.05 324.79)" fill="#903de2" stroke="#000" stroke-width="6">
                            <circle cx="100" cy="100" r="100" stroke="none"/>
                            <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Ellipse_4)">
                        <g className="single-grape-landing" id="Ellipse_4-2" data-name="Ellipse 4" transform="translate(317.05 487.79)" fill="#903de2" stroke="#000" stroke-width="6">
                            <circle cx="100" cy="100" r="100" stroke="none"/>
                            <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Ellipse_5)">
                        <g className="single-grape-landing stagger" id="Ellipse_5-2" data-name="Ellipse 5" transform="translate(358.05 344.79)" fill="#903de2" stroke="#000" stroke-width="6">
                            <circle cx="100" cy="100" r="100" stroke="none"/>
                            <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Ellipse_3)">
                        <g className="single-grape-landing stagger" id="Ellipse_3-2" data-name="Ellipse 3" transform="translate(184.05 415.79)" fill="#903de2" stroke="#000" stroke-width="6">
                            <circle cx="100" cy="100" r="100" stroke="none"/>
                            <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 1083.95, 211.21)" filter="url(#Ellipse_6)">
                        <g className="single-grape-landing stagger" id="Ellipse_6-2" data-name="Ellipse 6" transform="translate(208.05 270.79)" fill="#903de2" stroke="#000" stroke-width="6">
                            <circle cx="100" cy="100" r="100" stroke="none"/>
                            <circle cx="100" cy="100" r="97" fill="none"/>
                        </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className="rightSide">
                {/* CALLING BUBBLES VISUALIZATION */ }
                <Bubbles></Bubbles>
            </div>
        </Container>
    );
}

export default Landing;
