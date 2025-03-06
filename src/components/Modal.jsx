function Modal({ children, onCloseModal }) {
	return (
		<>
			<div className='backdrop' onClick={onCloseModal}></div>
			<dialog open className='modal'>
				{children}
			</dialog>
		</>
	);
}

export default Modal;
