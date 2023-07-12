import { useState } from "react";


export default function Form({onAddItems}) {

    const [description , set_description] = useState('');
    const [quantity , set_quantity] = useState(1);
    
  
    function handle_submit(e) {
      e.preventDefault();
  
      if(!description) return;
  
      const new_item = {description , quantity , package:false , id:Date.now()};
      onAddItems(new_item);
    }
  
    return( 
      <form className='add-form' onSubmit={handle_submit}>
          <h3>what do you need for your trip?</h3>
          <select value={quantity} onChange={e=> set_quantity(+e.target.value)}>
            {Array.from({length:20} , (_,i)=> i+1).map(i => <option value={i} key={i}>{i}</option>)}
          </select>
          <input type="text" 
                placeholder="item" 
                value={description} 
                onChange={e => set_description(e.target.value)}/>
          <button>Add</button>
      </form>
    )
  }