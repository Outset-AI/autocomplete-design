function Snackbar({ message, handleClose, success }) {
  return (
    <div className={`snackbar-container ${success ? 'success' : 'fail'}`}>
      <p className="snackbar-message">{message}</p>
      <p className="snackbar-close" onClick={handleClose}>
        x
      </p>
    </div>
  );
}

export default Snackbar;
