import React, { useState } from 'react';
import List from './List';
import './Board.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



const data = [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-11', content: 'Task 1' , priority:'grey'},
        { id: 'card-12', content: 'Task 2' , priority:'grey'},
        { id: 'card-13', content: 'Task 3' , priority:'grey'},
        { id: 'card-14', content: 'Task 4' , priority:'grey'},

      ],
    },
    {
      id: 'list-2',
      title: 'Doing',
      cards: [
        { id: 'card-23', content: 'Task 3', priority:'grey' },
        { id: 'card-24', content: 'Task 4' , priority:'grey'},
      ],
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [
        { id: 'card-35', content: 'Task 5' , priority:'grey'},
        { id: 'card-36', content: 'Task 6' , priority:'grey'},
      ],
    },
]

  

function Board() {
  const [lists , set_lists] = useState(data);
  const [add_list , set_add_list] = useState(false);
  const [name , set_name] = useState('');

  function handle_add_list(e) {
    e.preventDefault();

    set_add_list(false);
    if(!name) return;

    const new_list = {
      id: `${Date.now()}`,
      title: name,
      cards: [],
    }
    console.log('new list id',new_list.id);
    let new_lists = [...lists];
    new_lists.push(new_list);
    set_lists(new_lists);

    set_name('');

  }

  function handle_add_card(lists) {
    set_lists(lists);
  }

  
  function priority_sort(new_card , listIndex) {
    //update the list with the card's new priority:
    const updated_cards = lists[listIndex].cards.map((card) => { return new_card.id===card.id ? new_card : card})
    let updated_list = {...lists[listIndex], cards:updated_cards};
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

      updated_list = {...lists[listIndex], cards:sortedCards};
      const sorted_lists = [...lists];
      sorted_lists[listIndex] = updated_list;
      set_lists(sorted_lists);
  }


  function list_sort(lists , listIndex) {
    let list = {...lists[listIndex]};

    const sortingOrder = {
        'red': 1,
        'white': 2,
        'blue': 3,
        'grey': 4,
      };
      // Sort the 'cards' array based on the 'color' using the custom sorting order
      const sortedCards = list.cards.slice().sort((a, b) => {
 
        return sortingOrder[a.priority] - sortingOrder[b.priority];
      });

      list = {...lists[listIndex], cards:sortedCards};
      const sorted_lists = [...lists];
      sorted_lists[listIndex] = list;

      set_lists(sorted_lists);
  }


  function handle_drag(results) {
    const {source , destination , type} = results;
    console.log(results);
    //in-case of dropping in the wrong place:
    if(!destination) return;
    //in-case of dropping in the source:
    if(source.droppableId===destination.droppableId && source.index===destination.index) return;

    //drag and drop lists in the board:
    if(type==='list_move') {
      const reordered_lists = [...lists]
      
      const [moved_list] = reordered_lists.splice(source.index , 1);
      reordered_lists.splice(destination.index , 0 , moved_list);

      return set_lists(reordered_lists);
    }

    //drag and drop cards in the lists:
    const list_source_index = lists.findIndex(list => list.id===source.droppableId);  //which list did u drag the card from?
    const list_dest_index = lists.findIndex(list => list.id===destination.droppableId);  //which list did u drop the card into?

    
    const new_source_cards = [...lists[list_source_index].cards];
    const new_dest_cards = source.droppableId!==destination.droppableId ? [...lists[list_dest_index].cards] : new_source_cards;

    
    const moved_card = new_source_cards.splice(source.index , 1);
    new_dest_cards.splice(destination.index , 0 , ...moved_card);

    const new_lists = [...lists];
    new_lists[list_source_index] = {...lists[list_source_index] , cards:new_source_cards};
    new_lists[list_dest_index] = {...lists[list_dest_index] , cards:new_dest_cards};


    set_lists(new_lists);
    // list_sort(list_source_index);
    list_sort(new_lists , list_dest_index);
    
  }


  return (
    <DragDropContext onDragEnd={handle_drag}>
      <Droppable droppableId='board' type='list_move'>

        {(provided) => (
          <div className='container'>
            <div {...provided.droppableProps} ref={provided.innerRef} className='Board'>
              {lists.map((list , listIndex) => (
                  
              <Draggable draggableId={list.id} index={listIndex} key={list.id}>
                {(provided) => (
                  <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <List list={list} key={list.id} index={listIndex} onSort={priority_sort} lists={lists} set_lists={handle_add_card}/>
                  </div>
                )}
              </Draggable>

              ))}
            {provided.placeholder}
            {!add_list && (<button className='add_list' onClick={()=> set_add_list(true)}>
                + Add List
            </button>)}

            {add_list && (
              <form className="add_card_form" onSubmit={handle_add_list}>
              <label>List name:</label>
              <input type="text" value={name} onChange={e => set_name(e.target.value)}/>

              <div className='form_btns'>
                  <button>Add List</button>
                  <button onClick={() => set_add_list(false)}>Cancel</button>
              </div>
          </form>
            )}
            </div>
            
          </div> 
        )}
        
      </Droppable>
    </DragDropContext>
  )
}

export default Board;
