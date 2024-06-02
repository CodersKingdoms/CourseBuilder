import React, { useState } from 'react';

const ResourceItem = ({ resource, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(resource.value);

  const handleSave = () => {
    onUpdate({ ...resource, value });
    setIsEditing(false);
  };

  return (
    <div className="resource-item">
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="resource-input"
        />
      ) : (
        resource.type === 'link' ? (
          <a href={resource.value}>{resource.value}</a>
        ) : (
          <span>{resource.value}</span>
        )
      )}
      {isEditing ? (
        <button onClick={handleSave} className="save-button">Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
      )}
      <button onClick={onDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default ResourceItem;
