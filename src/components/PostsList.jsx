import { useEffect, useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function PostsList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editPost, setEditPost] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8080/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const resData = await response.json();
                setPosts(resData.posts);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }

        fetchPosts();
    }, []);

    async function addPostHandler(postData) {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to add post');
            }
            setPosts((prevPosts) => [postData, ...prevPosts]);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    function deletePostHandler(index) {
        setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
    }

    function startEditPostHandler(index) {
        setEditPost({ ...posts[index], index });
    }

    function editPostHandler(updatedPost) {
        setPosts((prevPosts) =>
            prevPosts.map((post, i) => (i === editPost.index ? updatedPost : post))
        );
        setEditPost(null);
    }

    return (
        <>
            {isPosting && (
                <Modal onCloseModal={onStopPosting}>
                    <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
                </Modal>
            )}

            {editPost && (
                <Modal onCloseModal={() => setEditPost(null)}>
                    <NewPost onCancel={() => setEditPost(null)} onAddPost={editPostHandler} initialData={editPost} />
                </Modal>
            )}

            {loading && <LoadingSpinner />}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {!loading && !error && posts.length > 0 && (
                <ul className='posts'>
                    {posts.map((post, index) => (
                        <li key={post.id || index} className='post-item'>
                            <Post author={post.author} body={post.body} />
                            <div className='post-buttons'>
                                <button className='edit-button' onClick={() => startEditPostHandler(index)}>Edit</button>
                                <button className='delete-button' onClick={() => deletePostHandler(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && !error && posts.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There are no posts yet.</h2>
                    <p>Try adding some!</p>
                </div>
            )}
        </>
    );
}

export default PostsList;