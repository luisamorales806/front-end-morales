import { useState } from 'react';

function NewPost({ onCancel, onAddPost }) {
	const [enteredBodyText, setEnteredBodyText] = useState('');
	const [enteredAuthorText, setEnteredAuthorText] = useState('');

	function bodyChangeHandler(event) {
		setEnteredBodyText(event.target.value);
	}

	function authorChangeHandler(event) {
		setEnteredAuthorText(event.target.value);
	}

	function submitHandler(event) {
		event.preventDefault();
		const postData = {
			body: enteredBodyText,
			author: enteredAuthorText
		};

		onAddPost(postData);
		onCancel();
	}

	return (
		<form className='form' onSubmit={submitHandler}>
			<p>
				<label htmlFor='body'>Text</label>
				<textarea
					id='body'
					required
					rows={3}
					onChange={bodyChangeHandler}
				/>
			</p>
			<p>
				<label htmlFor='name'>Your name</label>
				<input
					type='text'
					id='name'
					required
					onChange={authorChangeHandler}
				/>
			</p>
			<p className='actions'>
				<button type='button' onClick={onCancel}>
					Cancel
				</button>
				<button type='submit'>Submit</button>
			</p>
		</form>
	);
}

export default NewPost;
