import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';
import './List.css';

function List({list}) {
    const [final_list , set_final_list] = useState(list);

    function priority_sort(new_card) {
        //update the list with the card's new priority:
        const updated_cards = final_list.cards.map((card) => { return new_card.id===card.id ? new_card : card})
        let updated_list = {...final_list, cards:updated_cards};
        const sortingOrder = {
            'red': 1,
            'white': 2,
            'blue': 3,
            'grey': 4,
          };
          // Sort the 'cards' array based on the 'color' using the custom sorting order
          const sortedCards = updated_list.cards.slice().sort((a, b) => {
            return sortingOrder[a.priority] - sortingOrder[b.priority];
          });

          updated_list = {...list, cards:sortedCards};
          set_final_list(updated_list);
    }


    return (
        <div className='List'>
            <div className='List-Title'>
                <span className='title'>{final_list.title}</span>
                <span className='menu'>...</span>
            </div>

            <ul>
                {final_list.cards.map((card) => (
                    <li className='card_list' key={card.id}>
                        <Card card={card} onSort={priority_sort}/>
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
