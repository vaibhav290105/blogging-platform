// src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();
            setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        navigate('/');
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
