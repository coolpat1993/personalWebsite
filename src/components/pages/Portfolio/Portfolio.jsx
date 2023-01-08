import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import './Portfolio.css'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://coolpat1993.github.io/Data/port.json'
function Portfolio() {
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    const [value, setValue] = useState(0)

    const fetchJobs = async () => {
        const reponse = await fetch(url)
        const newJobs = await reponse.json()
        setJobs(newJobs)
        setLoading(false)
    }
    useEffect(() => {
        fetchJobs()
    }, [])
    if (loading) {
        return (
            <section className="section loading">
                <h1>Loading...</h1>
            </section>
        )
    }
    const { company, dates, duties, title, email } = jobs[value]
    return (
        <div className='root'>
            <section className="section">
                <div className="title">
                    <h2>experience</h2>
                    <div className="underline"></div>
                </div>
                <div className="jobs-center">
                    {/* btn container */}
                    <div className="btn-container">
                        {jobs.map((item, index) => {
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setValue(index)}
                                    className={`job-btn ${index === value && 'active-btn'}`}
                                >
                                    {item.company || item.title}
                                </button>
                            )
                        })}
                    </div>
                    {/* job info */}
                    <article className="job-info">
                        <h3>{title}</h3>
                        <h4>{company || email}</h4>
                        <p className="job-date">{dates}</p>
                        {duties.map((duty, index) => {
                            return (
                                <div key={index} className="job-desc">
                                    <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                                    <p>{duty}</p>
                                </div>
                            )
                        })}
                    </article>
                </div>
            </section>
        </div>
    )
}

export default Portfolio