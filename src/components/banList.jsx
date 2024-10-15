import React from 'react';

function BanList({ banList, removeFromBanList }) {
  return (
    <div>
      <p>Select an attribute in your listing to ban it</p>
      <ul>
        {banList.length === 0 ? (
          <li>No attributes banned yet</li>
        ) : (
          banList.map((attribute, index) => (
            <li 
              key={index} 
              className="ban-list-item" 
              onClick={() => removeFromBanList(attribute)}
            >
              {attribute}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BanList;
