import { useState } from "react";
import Item from "./Item";

export default function PackingList({items , onDeleteItem , onUpdatePacked , onDeleteList}) {
    const [sort , set_sort] = useState('input');
  
    let sorted_items;
  
    if(sort === 'input')  sorted_items=items;
  
    if(sort === 'description') sorted_items=items.slice().sort((a,b) => a.description.localeCompare(b.description));
    
    if(sort === 'packed') sorted_items=items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  
    return (
      <div className="list">
        <span>
          {sorted_items.map(item => <Item item={item} 
                                   onDeleteItem={onDeleteItem} 
                                   onUpdatePacked={onUpdatePacked} 
                                   key={item.id}/>)}
        </span>
  
        <div className="actions">
          <select value={sort} onChange={e => set_sort(e.target.value)}>
            <option value='input'>Sort by input order</option>
            <option value='description'>Sort by description</option>
            <option value='packed'>Sort by packed status</option>
          </select>
  
          <button onClick={onDeleteList}>Clear List</button>
        </div>
      </div>
    )
  }