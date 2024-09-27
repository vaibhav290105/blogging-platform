import React, { useState, useEffect } from 'react';

const PostForm = ({ fetchPosts, editingPost, setEditingPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setContent(editingPost.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };

        try {
            if (editingPost) {
                await fetch(`https://mighty-snails.up.railway.app/api/posts/${editingPost.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData),
                });
            } else {
                await fetch('https://mighty-snails.up.railway.app/api/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(postData),
                });
            }
            await fetchPosts(); // Refresh posts list
            setEditingPost(null); // Clear editing state
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
            />
            <button type="submit">{editingPost ? 'Update' : 'Add Post'}</button>
        </form>
    );
};

export default PostForm;
