'use client'
import React, { useState } from 'react'
import './Questions.css'


export default function QuestionCard({question, answer}) {
    const [isOpen, setIsOpen] = useState(false)

    

    return (
        <div onClick={()=>{setIsOpen(!isOpen)}} className={`card opacity-0 fade-in-section`}>
            <div className="topCtr">
                <h4>{question}</h4>
                <svg
                    className={`arrow ${isOpen ? "open" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width={51}
                    height={51}
                    viewBox="0 0 51 51"
                    fill="none"
                    >
                    <circle
                        cx="25.455"
                        cy="25.3309"
                        r="24.8309"
                        fill="#105A25"
                        stroke="#4CB848"
                    />
                    <path
                        d="M17.1984 22.2212L25.455 30.4405L33.7115 22.2212"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                
            </div>
            <div className={`bottomCtr ${isOpen && 'active'}`}>
                <p>{answer}</p>
            </div>
        </div>
    )
}
