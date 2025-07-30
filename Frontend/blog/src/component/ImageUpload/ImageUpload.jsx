import React, { useState, useRef } from 'react';
import ApiService from '../../utils/api.js';

export default function ImageUpload({ onImageUploaded, currentImageUrl, onImageRemoved }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await ApiService.uploadImage(file);
      onImageUploaded(response.url);
    } catch (error) {
      setError('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    if (currentImageUrl) {
      onImageRemoved();
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      {error && (
        <div className="upload-error">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError('')} className="error-close">✕</button>
        </div>
      )}

      {currentImageUrl ? (
        <div className="image-preview">
          <img src={currentImageUrl} alt="Preview" />
          <div className="image-actions">
            <button 
              type="button" 
              onClick={openFileDialog} 
              className="btn btn-secondary"
              disabled={uploading}
            >
              📷 Change Image
            </button>
            <button 
              type="button" 
              onClick={handleRemoveImage} 
              className="btn btn-danger"
            >
              🗑️ Remove
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={`upload-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {uploading ? (
            <div className="upload-progress">
              <div className="loading-spinner"></div>
              <p>Uploading image...</p>
            </div>
          ) : (
            <div className="upload-content">
              <div className="upload-icon">📷</div>
              <h4>Upload Featured Image</h4>
              <p>Drag & drop an image here, or click to select</p>
              <div className="upload-info">
                <small>Supports JPEG, PNG, GIF, WebP • Max 5MB</small>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        
      />
    </div>
  );
}