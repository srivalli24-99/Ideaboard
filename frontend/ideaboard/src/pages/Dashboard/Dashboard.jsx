import {useEffect, useState} from 'react';
import './Dashboard.css';
import Navbar from '../../components/Navbar/Navbar';

const Dashboard = () => {

  const[dashboardData, setDashboardData] = useState({
    total_ideas:0,
    approved:0,
    pending:0,
    rejected:0,
    recent_ideas:[]
  });

  useEffect(() => {
    const fetchDashboardData = async ()=> {
      const accessToken = localStorage.getItem("access");
      try{
        const response = await fetch(
          'http://3.104.123.79:8000/api/ideas/dashboard/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if(!response.ok){
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dashboard API:', data);
        setDashboardData(data);
      } catch(error){
        console.log('Dashboard error:', error);
      }
    };
    fetchDashboardData();
  }, []);
  return (
    <>
    <Navbar />
    
    <div className='dashboard'>
      <h1>Ideaboard</h1>
      <div className="stats-container">
        <div className="stats-card">
          <h3>Total Ideas</h3>
          <p>{dashboardData.total_ideas}</p>
        </div>
        <div className="stats-card">
          <h3>Approved</h3>
          <p>{dashboardData.approved}</p>
        </div>
        <div className="stats-card">
          <h3>Pending</h3>
          <p>{dashboardData.pending}</p>
        </div>
        <div className="stats-card">
          <h3>Rejected</h3>
          <p>{dashboardData.rejected}</p>
        </div>
      </div>

      <div className="recent-ideas">
        <h2>Recent Ideas</h2>

        <div className="ideas-table">
          <div className="table-header">
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Created By</span>
          </div>
       
          {dashboardData.recent_ideas.map((idea) => (
            <div className="table-row" key={idea.id}>
              <span>{idea.title}</span>
              <span>{idea.category}</span>
              <span>{idea.status}</span>
              <span>{idea.created_by}</span>
            </div>
          ))}

        </div>
        
      </div>
    </div>


  </>
  );
}

export default Dashboard;
