import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';

function Catalog() {

  const [weaponsArray, setWeaponsArray] = useState([]);
  const [arrayCopy, setArrayCopy] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();

  const POEWeaponsEndpoint = "https://corsproxy.io/?https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueWeapon";

  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(POEWeaponsEndpoint);
        const lines = response.data.lines;
        const randomItems = getRandomItems(lines, 60);
        console.log(randomItems);

        const weaponsData = randomItems.map(line => {

          const weaponId = line.detailsId;
          const weaponName = line.name;
          const weaponPrice = `${line.chaosValue} chaos orbs`;
          const weaponIcon = line.icon;

          return {
            id: weaponId,
            name: weaponName,
            price: weaponPrice,
            icon: weaponIcon
          };
        });

        setWeaponsArray(weaponsData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleNavigate = (id) => {
    navigate(`/details/${id}`)
  }

  const handleSort = () => {
    if (!isSorted) {
      setArrayCopy(weaponsArray);
      const sortedArray = [...weaponsArray].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceB - priceA;
      });
      setWeaponsArray(sortedArray);
    } else {
      setWeaponsArray(arrayCopy);
    }
    setIsSorted(!isSorted);
  }

  return (
    <>
      <Helmet>
        <title>POE Price Lister</title>
      </Helmet>
      <div className='grid-header'>
        <h2>Listed Items</h2>
        <div>
          <input type='button' value={isSorted ? 'Undo' : 'Sort by Price'} onClick={handleSort} className={isSorted ? 'enabled' : ''} />
        </div>
      </div>
      <div className='items-grid'>
        {weaponsArray.map((item) => (
          <div className='weapon-item' key={item.id} onClick={() => handleNavigate(item.id)}>
            <img alt='weapon icon' src={item.icon} />
            <div className='item-info'>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Catalog
