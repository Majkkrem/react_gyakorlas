import React, {useState, useEffect, useRef, SetStateAction} from "react";
import './todolist.css'

interface Item {
  id: number;
  name: string;
  amount: number;
  unit: string;
  completed: boolean;
}

function App(){
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState(Number);
  const [newItemUnit, setNewItemUnit] = useState('');
  const [error, setError] = useState('');
  const [allPurchased, setAllPurchased] = useState(false);


  const addItem = () => {
    if(newItemName.trim() === '' || newItemAmount <= 0 || newItemUnit.trim() === ''){
      setError("Minden mezőt kötelező kitölteni!");
      return;
    }

    if (items.some(item => item.name === newItemName)) {
      setError("Ez a termék már szerepel a listában!");
      return;
    }

      
    if (newItemName.length > 15) {
      setError("A termék neve legfeljebb 15 karakter lehet!");
      return;
    }

    const newItem : Item = {id: Date.now(), name: newItemName, amount: newItemAmount, unit: newItemUnit, completed: false};
 


    setItems((prevItem) => [...prevItem, newItem]);
    setNewItemName('');
    setNewItemAmount(Number);
    setNewItemUnit('');
    setError('');
  }

  const removeItem = (itemID : number) => {
    setItems((prevItem) => 
      prevItem.filter((item) => item.id !== itemID));
  };


  const toggleBought = (itemID: number) => {
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === itemID ? {...item, completed : !item.completed} : item)
  )}

  useEffect(() => {
    setAllPurchased(items.length > 0 && items.every(item => item.completed));
  }, [items]);

  return (
  <>
    <div>
      <h2>Bevásárlólista</h2>
      <div>
        <label htmlFor="">Terméknév: </label>
        <input type="text" value={newItemName} onChange={(e) =>{ setNewItemName(e.target.value)}} name="" id="" />
        <label htmlFor="">Mennyiség: </label>
        <input type="text" value={newItemAmount} onChange={(e) =>{ setNewItemAmount(parseInt(e.target.value))}} name="" id="" />
        <label htmlFor="">Mennyiség egység: </label>
        <input type="text" value={newItemUnit} onChange={(e) =>{ setNewItemUnit(e.target.value)}} name="" id="" />
        <button onClick={addItem}>Hozzáadás</button>
      </div>
      <div>
      {allPurchased && <div className="success">Az összes termék megvásárlásra került!</div>}
      </div>
      <p style={{ color: "red" }}>{error}</p>
      <ul>
          {items.map((item) => {
            const itemClass = `item ${item.completed ? "bought" : ""}`;
            return(
            <li key={item.id} className={itemClass}>
              <span style={{opacity: item.completed? "0.2": "1"}}>
              {item.name + " "+ item.amount + " " + item.unit}
              
              </span>
              <button onClick={() => toggleBought(item.id)}>
                {item.completed ? "Visszaállítás": "Megvásárolva"}
              </button>
              <button onClick={() => removeItem(item.id)}>Törlés</button>
            </li>
            );
          })}
      </ul>
    </div>
    
  </>
  )
 
}

export default App