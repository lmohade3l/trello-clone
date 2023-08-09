import Card from './Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './List.css';
import { useState } from 'react';

function List({list , index, onSort , lists , set_lists }) {
    const [add_card , set_add_card] = useState(false);
    const [name , set_name] = useState('');
    const [priority , set_priority] = useState('grey');

    console.log('from list',list)

    function handle_add_card(e) {
        e.preventDefault();
        set_add_card(!add_card);

        if(!name) return;

        const new_card = {
            id: `${Date.now()}`,
            content: name,
            priority: priority,
        }
        let new_list = list;
        new_list.cards.push(new_card);
        
        set_name('');
        set_priority('grey');

        set_lists((lists) => lists.map(list => list.id===new_list.id?new_list : list))


    }

    return (
        <Droppable droppableId={list.id} type='card_move'>
            {(provided) => (
            <div className='List' {...provided.droppableProps} ref={provided.innerRef}>
                <div className='List-Title'>
                    <span className='title'>{list.title}</span>
                    <span className='menu'>...</span>
                </div>

                <div>
                    <ul>
                    {list.cards.map((card , cardIndex) => (
                        <Draggable draggableId={card.id} index={cardIndex} key={card.id}>
                            {(provided) => (
                            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                <li className='card_list' key={card.id}>
                                        <Card card={card} id={card.id} index={cardIndex} listIndex={index} onSort={onSort}/>
                                </li>
                             </div>
                            )}
                        </Draggable>
                    ))}
                        {provided.placeholder}
                        {!add_card && (<div className='add_card' onClick={handle_add_card} key='231'>
                            + Add Task
                        </div>)}
                    </ul>

                    {add_card && (
                        <form className="add_card_form" onSubmit={handle_add_card}>
                            <label>Task name:</label>
                            <input type="text" value={name} onChange={e => set_name(e.target.value)}/>

                            <label>Priority:</label>
                            <select value={priority} onChange={e => set_priority(e.target.value)}>
                                <option value='red'>High</option>
                                <option value='white'>Normal</option>
                                <option value='blue'>Low</option>
                                <option value='grey'>No Priority</option>
                            </select>

                            <div className='form_btns'>
                                <button>Add Task</button>
                                <button onClick={() => set_add_card(false)}>Cancel</button>
                            </div>
                        </form>
                    )}

                </div>
                
            </div>
            )}
            
        </Droppable>
   
    )
}

export default List;
