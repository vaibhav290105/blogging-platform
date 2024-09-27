
import React, { useEffect, useState } from 'react';
import PostForm from './components/PostForm'; // Adjust the import path as needed
import PostList from './components/PostList'; // Import the PostList component

const App = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://mighty-snails.up.railway.app/api/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount
    }, []);

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://mighty-snails.up.railway.app/api/posts/${id}`, {
                method: 'DELETE',
            });
            // Remove deleted post from state
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <h1>Blog Posts</h1>
            <PostForm fetchPosts={fetchPosts} editingPost={editingPost} setEditingPost={setEditingPost} />
            <PostList onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default App;

