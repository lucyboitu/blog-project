import axios from 'axios';

export const createPost = async (postData) => {
    console.log('Request Body:', req.body); 

  const token = localStorage.getItem('token'); 
  try {
 const response = await axios.post(`${API}/posts`, postData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});
    console.log('Post created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error;
  }
};
