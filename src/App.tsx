import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './todolist.css';

interface Item {
  id: number;
  name: string;
  amount: number;
  unit: string;
  completed: boolean;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState(Number);
  const [newItemUnit, setNewItemUnit] = useState('');
  const [error, setError] = useState('');
  const [allPurchased, setAllPurchased] = useState(false);

  const addItem = () => {
    if (newItemName.trim() === '' || newItemAmount <= 0 || newItemUnit.trim() === '') {
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

    const newItem: Item = { id: Date.now(), name: newItemName, amount: newItemAmount, unit: newItemUnit, completed: false };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemAmount(Number);
    setNewItemUnit('');
    setError('');
  };

  const toggleItemCompletion = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setAllPurchased(items.length > 0 && items.every(item => item.completed));
  }, [items]);

  const remainingItems = items.filter(item => !item.completed).length;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Bevásárlólista</h2>
      <div>
        <form className="">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemName">Terméknév:</label>
              <input type="text" className="form-control" id="itemName" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="itemAmount">Mennyiség:</label>
              <input type="number" className="form-control" id="itemAmount" value={newItemAmount} onChange={(e) => setNewItemAmount(parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label htmlFor="itemUnit">Mennyiség egység:</label>
              <input type="text" className="form-control" id="itemUnit" value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)} />
            </div>
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={addItem}>Hozzáadás</button>
        </form>
        {allPurchased && <div className="alert alert-success">Az összes termék megvásárlásra került!</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <p className="text-success">Hátralévő termékek száma: {remainingItems}</p>
        <ul className="list-group">
          {items.map((item) => {
             const itemClass = `item ${item.completed ? "bought" : ""}`;
            return (
              <li key={item.id} className={itemClass}>
                <span style={{opacity: item.completed? "0.2": "1"}}>
                {item.name + " "+ item.amount + " " + item.unit}
                </span>
                  
                    <button className="btn btn-sm btn-outline-secondary mr-2" onClick={() => toggleItemCompletion(item.id)}>
                      {item.completed ? 'Visszavonás' : 'Megvásárolva'}
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item.id)}>
                      Törlés
                    </button>
                  
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;