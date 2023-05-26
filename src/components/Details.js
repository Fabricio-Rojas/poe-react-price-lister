import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'

function Details() {

  const {itemid} = useParams();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemBaseType, setItemBaseType] = useState('');
  const [itemDivineValue, setItemDivineValue] = useState('');
  const [itemExaltedValue, setItemExaltedValue] = useState('');
  const [itemText, setItemText] = useState('');
  const [itemImplicit, setItemImplicit] = useState('');
  const [itemExplicit, setItemExplicit] = useState([]);


  const POEWeaponsEndpoint = "https://corsproxy.io/?https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueWeapon";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(POEWeaponsEndpoint);
        console.log(response);

        for (let i = 0; i < response.data.lines.length; i++) {
          let selectedItem = response.data.lines[i];
          if (selectedItem.detailsId === itemid) {
            console.log(selectedItem);
            setItemImage(selectedItem.icon);
            setItemName(selectedItem.name);
            setItemBaseType(selectedItem.baseType);
            setItemDivineValue(selectedItem.divineValue);
            setItemExaltedValue(selectedItem.exaltedValue);
            setItemPrice(selectedItem.chaosValue);
            setItemText(selectedItem.flavourText);
            setItemExplicit(selectedItem.explicitModifiers.map(modifier => (
              modifier.text
            )));
            setItemImplicit(selectedItem.implicitModifiers[0].text);
            return;
          } 
        }
        navigate('*')
      } catch (error) {
        console.log(error);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [])

  return (
    <>
    <Helmet>
      <title>{itemName}</title>
    </Helmet>
      <div className='item-details'>
        <img alt='item icon' src={itemImage} />
        <div>
          <h1>{itemName}</h1>
          <p>Base Type: {itemBaseType}</p>
          <h2>&bull; Currency Values</h2>
          <p>{itemDivineValue} Divine Orbs | {itemExaltedValue} Exalted Orbs | {itemPrice} Chaos Orbs</p>
          <h2>&bull; Flavour Text</h2>
          <p>{itemText}</p>
          <h2>&bull; Item Modifiers</h2>
          <h3>Implicit Modifier ~</h3>
          {itemImplicit ? <p>{itemImplicit}</p> : <p>None</p>}
          <h3>Explicit Modifiers ~</h3>
          {itemExplicit.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default Details
