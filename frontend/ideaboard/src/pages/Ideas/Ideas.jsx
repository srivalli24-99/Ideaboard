import React, { useEffect, useState } from 'react';
import './Ideas.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Ideas = () => {

    const [ideas, setIdeas] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleCreateIdea = async () => {
        const accessToken = localStorage.getItem("access");
        console.log('Access Token:', accessToken);

        try{
            const response = await fetch(
                `http://3.104.123.79:8000/api/ideas/`,
                {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${accessToken}`,
                    },
                    body : JSON.stringify({
                        title: title,
                        description: description,
                        category: category,
                    }),
                }
            );
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Create Idea API:', data);

            setIdeas((previousIdeas) => [...previousIdeas,data]);
            setTitle('');
            setDescription('');
            setCategory('');
            setShowForm(false);
        }catch(error){
            console.log('Create Idea error:', error);
        }
    };

    useEffect(() => {
        const fetchIdeas = async () => {
            const accessToken = localStorage.getItem("access");

            try{
                const response = await fetch(
                    'http://3.104.123.79:8000/api/ideas/',
                    {
                        headers : {
                            Authorization : `Bearer ${accessToken}`,
                        },
                    }
                );

                if(!response.ok){
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Ideas API:', data);
                setIdeas(data);
            }catch(error){
                console.log('Ideas error:', error);
            }
        };
        fetchIdeas();
    }, []);


    const filteredIdeas = ideas.filter((idea) => {
        const matchesSearch = idea.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        const matchesStatus = statusFilter === '' || idea.status === statusFilter;
        return matchesSearch && matchesStatus;
    })
    .sort((a,b) => {
        if(sortOrder === 'title-asc'){
            return a.title.localeCompare(b.title);
        }
        if(sortOrder === 'title-desc'){
            return b.title.localeCompare(a.title);
        }
        return 0;
    });
  return (
    <>
    <Navbar />

    <div className="ideas">
        <div className="ideas-header">
            <h1>Ideas</h1>
            <button className='create-idea-button' onClick={()=> setShowForm(!showForm)}>+ Create Idea</button>
        </div>

        <div className="idea-controls">
            <div className="search-section">
                <input type='text' placeholder='Search ideas...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="filter-section">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="implemented">Implemented</option>
                </select>
            </div>

            <div className="sort-section">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                </select>
            </div>
        </div>

      

        {showForm && (
        <div className="create-idea-form">
            <h2>Create New Idea</h2>
            <div>
                <label>Title</label>
                <input type='text' placeholder='Enter idea title' value={title} onChange={(e)=> setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Description</label>
                <textarea placeholder='Enter idea description' value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Category</label>
                <input type='text' placeholder='Enter category' value={category} onChange={(e)=> setCategory(e.target.value)}/>
            </div>
            <button type='button' onClick={handleCreateIdea}>Submit Idea</button>
        </div>
        )}
        <div className="ideas-table">

            <div className="table-header">
                <span>Title</span>
                <span>Category</span>
                <span>Status</span>
                <span>Created By</span>
            </div>

            {filteredIdeas.map((idea) => (
                <div className="table-row" key={idea.id}>
                    <Link to={`/ideas/${idea.id}`}>{idea.title}</Link>
                    <span>{idea.category}</span>
                    <span className={`status-badge status-${idea.status}`}>{idea.status}</span>
                    <span>{idea.created_by}</span>
                </div>
            ))}
        </div>
    </div>
    </>
    
  );
}

export default Ideas;
