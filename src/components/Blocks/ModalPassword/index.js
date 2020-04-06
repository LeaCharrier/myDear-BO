import React from 'react';
import './styles.scss';

function ModalPassword({
  open,
  message,
  onCancel
}) {
  return (
    open && (
      <div className="modalPassword">
        <div className="modal-content">
          <p>{message}</p>
          <button type="submit" onClick={onCancel} className="cross">
            <i />
          </button>
        </div>
      </div>
    )
  );
}

export default ModalPassword;
