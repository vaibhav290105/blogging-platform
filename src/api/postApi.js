import axios from 'axios';

const API_URL = 'https://mighty-snails.up.railway.app/api/posts';

// Fetch all posts
export const fetchPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

// Create a new post
export const createPost = async (newPost) => {
    try {
        const response = await axios.post(API_URL, newPost);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
