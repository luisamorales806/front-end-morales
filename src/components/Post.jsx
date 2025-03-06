function Post({ author, body }) {
	return (
		<li className='post'>
			<p className='author'>{author}</p>
			<p className='text'>{body}</p>
		</li>
	);
}

export default Post;
