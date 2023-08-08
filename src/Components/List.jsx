import Card from './Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './List.css';

function List({list , index, onSort }) {
    console.log('from list',list)

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
                        <li className='add_card' key='231'>
                            Add Card
                        </li>
                    </ul>
                </div>
                
            </div>
            )}
            
        </Droppable>
   
    )
}

export default List;
