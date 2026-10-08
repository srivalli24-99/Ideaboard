import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './IdeaDetails.css';

const IdeaDetails = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const[idea, setIdea]  = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [userRole, setUserRole] = useState('');
    const [newStatus, setNewStatus] = useState('');

    
    useEffect(() => {
        const fetchUserProfile = async() => {
            const accessToken = localStorage.getItem('access');

            try{
                const response = await fetch(
                    `http://3.104.123.79:8000/api/users/profile`,
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
                console.log('User Profile API:', data);
                setUserRole(data.role);
            }catch(error){
                console.log('User Profile error:', error);
            }
        };
        fetchUserProfile();
    }, []);


    const handleUpdateIdea = async() => {
        const accessToken = localStorage.getItem('access');

        try{
            const response = await fetch(
                `http://3.104.123.79:8000/api/ideas/${id}/edit/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        description: editDescription,
                        category: editCategory,
                }),
                }
            );

            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Update Idea API:', data);
            setIdea(data);
            setIsEditing(false);
        }catch(error){
            console.log('Update Idea error:', error);
        }
    };


    const handleUpdateStatus = async() => {
        const accessToken = localStorage.getItem('access');

        try{
            const response = await fetch(
                `http://3.104.123.79:8000/api/ideas/${id}/review/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Update Status API:', data);

            setIdea((previousIdea) => ({
                ...previousIdea,
                status: data.status,
            }));
           
        }catch(error){
            console.log('Update Status error:', error);
        }
    };



    const handleDeleteIdea = async() => {
        const accessToken = localStorage.getItem('access');

        try{
            const response = await fetch(
                `http://3.104.123.79:8000/api/ideas/${id}/delete/`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }
            console.log('Idea deleted successfully');
            navigate('/ideas');
        }catch(error){
            console.log('Delete Idea Error:', error);
        }
    };

    const handleAddComment = async() => {
        const accessToken = localStorage.getItem('access');

        try{
            const response = await fetch(
                `http://3.104.123.79:8000/api/comments/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        idea: id,
                        text: commentText,
                    }),
                }
            );

            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Add comments API:', data);

            setComments((previousComments) => [
                ...previousComments,
                data
            ]);
            setCommentText('');

        }catch(error){
            console.log('Add comment error:', error);
        }
    };

    useEffect(() => {
        const fetchIdeaDetails = async() => {
            const accessToken = localStorage.getItem('access');
            console.log('Access Token:', accessToken);

            try{
                const response = await fetch(
                    `http://3.104.123.79:8000/api/ideas/${id}/`,
                    {
                        headers : {
                            Authorization : `Bearer ${accessToken}`,
                        },
                    }
                );
                if(!response.ok){
                    const errorData = await response.text();
                    console.log('Backend error:', errorData);    
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                console.log('Idea Details API:', data);
                setIdea(data);
            }catch(error){
                console.log('Idea Details error:', error);
            }
        };
        fetchIdeaDetails();
    }, [id]);


    useEffect(() => {
        const fetchComments = async() => {
            const accessToken = localStorage.getItem("access");

            try{
                const response = await fetch(
                    `http://3.104.123.79:8000/api/comments/idea/${id}/`,
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
                console.log('Comments API:', data);
                setComments(data);
            }catch(error){
                console.log('Comments error:', error);
            }
        };
        fetchComments();
    }, [id]);


    useEffect(() => {
        const fetchUserProfile = async() => {
            const accessToken = localStorage.getItem('access');

            try{
                const response = await fetch(
                `http://3.104.123.79:8000/api/users/profile/`,
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
            console.log('User Profile  API:', data);
            setUserRole(data.role);
        }catch(error){
            console.log('User Profile error:', error);
        }
    };

    fetchUserProfile();
}, []);
    
  return (
    <div className='idea-details'>
      <h1>Idea Details</h1>
      {idea && (
        <div className="idea-details-card">
            <h2>{idea.title}</h2>
            <p><strong>Description:</strong>{idea.description}</p>
            <p><strong>Category:</strong>{idea.category}</p>
            <p>
                <strong>Status:</strong>
                <span className={`status-badge status-${idea.status}`}></span>
                {idea.status}</p>

            {(userRole === 'manager' || userRole === 'admin') && (
                <div className="status-update-section">
                    <h3>Update Status</h3>
                    <select value={newStatus} onChange={(e)=> setNewStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="implemented">Implemented</option>
                    </select>
                    <button onClick={handleUpdateStatus}>Update Status</button>
                </div>
            )}

            <p><strong>Created By:</strong>{idea.created_by}</p>
            <p><strong>Created At:</strong>{idea.created_at}</p>

            {userRole === 'employee' && (
            <button onClick={() => {
                setEditTitle(idea.title);
                setEditDescription(idea.description);
                setEditCategory(idea.category);
                setIsEditing(true);
                }}>Edit Idea</button>
            )}
                
            {userRole === 'admin' && (
            <button onClick={handleDeleteIdea}>Delete Idea</button>    
            )}

            {isEditing && (
                <div className="edit-idea-form">
                    <h2>Edit Idea</h2>
                    <input type='text' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder='Enter title' />
                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder='Enter description'></textarea>
                    <input type='text' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} placeholder='Enter category' />
                    <button onClick={handleUpdateIdea}>Update Idea</button>
                </div>
            )}
        </div>
      )}

      
      <div className="comments-section">
        <h2>Comments</h2>
        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder='Write a comment..'></textarea>
        <button onClick={handleAddComment}>Add Comment</button>

        {comments.length === 0 ? (
            <p>No comments yet.</p>
        ) : (
            comments.map((comment) => (
                <div className="comments-card" key={comment.id}>
                    <strong>{comment.user}</strong>
                    <p>{comment.text}</p>
                </div>
            ))
        )       
        }
      </div>

      
    </div>
  );
};

export default IdeaDetails;
