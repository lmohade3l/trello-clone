import React, {  useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css'



function Card({card , onSort , index , listIndex}) {
    console.log(card.priority);
    const [show_btn , set_show_btn] = useState(false);
    const [is_open , set_is_open] = useState(false);
    const [tag , set_tag] = useState('white');

    
    function on_mouse_enter () {
        set_show_btn(true);
    }

    function on_mouse_leave () {
        set_show_btn(false);
    }

    function toggle_dropdown_menu() {
        set_is_open(!is_open);
    }

    function toggle_tag(value) {
        set_tag(value);
        set_is_open(false);
        card = {...card , priority:value};
        onSort(card , listIndex);
    }


    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className='Card' 
        
                onMouseEnter={on_mouse_enter} 
                onMouseLeave={on_mouse_leave}
                style={{background:
                    `${card.priority==='white' ? 'white' : 
                    card.priority==='red' ? 'red' :
                    card.priority==='blue' ? 'blue' : 'grey'}`
                   }}>
   
               {card.content}
           {show_btn && 
               <button className='dropdown_btn' onClick={toggle_dropdown_menu} >
                   edit
               </button>}
   
           {is_open && (
               <ul className="dropdown_menu">
                   <div className='menu_header'>
                       <p>Set a tag:</p>
                       {/* <span><button className='close_menu_btn'>X</button></span> */}
                   </div>
                   <li value='red' onClick={() => toggle_tag('red')} key='high'>High</li>
                   <li value='white' onClick={() => toggle_tag('white')} key='normal'>Normal</li>
                   <li value='blue' onClick={() => toggle_tag('blue')} key='low'>Low</li>
                   <li value='grey' onClick={() => toggle_tag('grey')} key='no=priority'>No Priority</li>
               </ul>
         )}
   
           </div>
            )}
        
        </Draggable>

    )
}


export default Card;
