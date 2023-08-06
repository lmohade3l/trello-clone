import React from 'react';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';
import './List.css';

function List({list}) {
    console.log(list);
    const updated_cards = list.cards.map((card) => { return {...card, priority: 'none'};})
    const updated_list = {...list, cards:updated_cards};
    console.log(updated_list);
    
    return (
        <div className='List'>
            <div className='List-Title'>
                <span className='title'>{list.title}</span>
                <span className='menu'>...</span>
            </div>

            <ul>
                {list.cards.map((card) => (
                    <li className='card_list' key={card.id}>
                        <Card card={card} />
                    </li>
                ))}
                <li className='add_card' key='231'>
                    Add Card
                </li>
            </ul>
        </div>
    )
}

export default List;
