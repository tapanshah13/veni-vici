import React from 'react';

function History({ history }) {
  return (
    <div>
      <ul>
        {history.length === 0 ? (
          <li>No cats viewed yet</li>
        ) : (
          history.map((item, index) => (
            <li key={index} className="cat-item">
              <img src={item?.url} alt="Viewed Cat" width="50" />
              {item?.breeds?.[0]?.name || 'Unknown Breed'} cat from {item?.breeds?.[0]?.origin || 'Unknown Origin'}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default History;
