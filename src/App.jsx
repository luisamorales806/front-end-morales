import { useState } from 'react';

import MainHeader from './components/MainHeader';
import PostsList from './components/PostsList';

function App() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	function showModalHandler() {
		setIsModalVisible(true);
	}

	function hideModalHandler() {
		setIsModalVisible(false);
	}

	return (
		<>
			<MainHeader onCreatePost={showModalHandler} />
			<main>
				<PostsList
					isPosting={isModalVisible}
					onStopPosting={hideModalHandler}
				/>
			</main>
		</>
	);
}

export default App;
