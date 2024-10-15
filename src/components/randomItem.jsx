import React from 'react';

function RandomItem({ item, addToBanList }) {
  // Safely access breed data and other attributes
  const breedName = item?.breeds?.[0]?.name || 'Unknown Breed';
  const weight = item?.breeds?.[0]?.weight?.imperial || 'Unknown Weight';
  const origin = item?.breeds?.[0]?.origin || 'Unknown Origin';
  const lifespan = item?.breeds?.[0]?.life_span || 'Unknown Lifespan';

  return (
    <div className="random-item">
      <h2>{breedName}</h2>
      <div className="cat-details">
        <button onClick={() => addToBanList(breedName)}>{breedName}</button>
        <button onClick={() => addToBanList(weight)}>{weight}</button>
        <button onClick={() => addToBanList(origin)}>{origin}</button>
        <button onClick={() => addToBanList(lifespan)}>{lifespan}</button>
      </div>
      <img src={item?.url} alt={breedName} width="300" />
    </div>
  );
}

export default RandomItem;
