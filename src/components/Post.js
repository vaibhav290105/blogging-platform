import React from 'react';

const Post = ({ post, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(post); // Pass the entire post object for editing
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(post.id); // Call the onDelete function with the post ID
        }
    };

    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Post;
