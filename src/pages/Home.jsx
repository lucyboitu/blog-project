import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import myImage from '../assets/images/side-image.png'; 
    

export default function Home() {
  const [posts, setPosts] = useState([]);

const API = import.meta.env.VITE_API_URL;
useEffect() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        // Retry after 1 second if response isn't ready
        setTimeout(fetchPosts, 1000);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      // Retry after delay in case the server is still waking up
      setTimeout(fetchPosts, 1000);
    }
  };
  fetchPosts();
}, []);


  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleCreatePostClick = () => {
    if (token) {
      navigate('/create-post'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className='container'>
      <div className='left-side'>
      <h1>Blogs that can<br /> be  interesting.</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul className='posts'>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </Link>
          </li>
          
        ))}
      </ul>
        <button onClick={handleCreatePostClick}>Create Post</button>
        
      </div>
      <div className="right-side">
        <div className='side-image'>
          <img src={myImage} alt="Side Image"/>
          </div>
      </div>
    </div>

  );
}
