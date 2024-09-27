import React, { useEffect, useState } from 'react';
import Post from './Post';

const PostList = ({ onEdit }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://mighty-snails.up.railway.app/api/posts');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts when component mounts
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://mighty-snails.up.railway.app/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            
            // Remove deleted post from state
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <h2>Posts</h2>
            {posts.map(post => (
                <Post key={post.id} post={post} onEdit={onEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default PostList;
