import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const fetchData = async() => {
      try{
        setLoad(true);
        const res = await fetch(url);
        const retdata = await res.json();
        setData(retdata);
      }catch(erorr){
        console.log(erorr);
      }finally{
        setLoad(false)
      }
  }
  useEffect(
    () => {
      fetchData();
    }
  ,[]);
  console.log(data);

  return <>
      {load?<section className="section loading">
        <h1>Loading...</h1>
      </section>:<section className="section"><div className = "title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">{
          data.map((item, index) => {
            return <>
              <button 
              key ={item.id}
              className = {`job-btn ${active===index && 'active-btn'}`}
              onClick = {() => setActive(index)}>{item.company}</button>
            </>
          })
        }</div>
        <article className="job-info">
          <h3>{data[active].title}</h3>
          <h4>{data[active].company}</h4>
          <p className = "job-data">{data[active].dates}</p>
          {data[active].duties.map((item) => {
            return <div className = "job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{item}</p>
            </div>
          })}
        </article>
      </div>
      <button className = "btn">more Info</button></section>}
  </>
}

export default App
