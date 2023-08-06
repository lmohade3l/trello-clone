import React from 'react';
import List from './List';
import './Board.css';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';


const data = {
  lists :
    [
      {
        id: 'list-1',
        title: 'To Do',
        cards: [
          { id: 'card-1', content: 'Task 1' },
          { id: 'card-2', content: 'Task 2' },
        ],
      },
      {
        id: 'list-2',
        title: 'Doing',
        cards: [
          { id: 'card-3', content: 'Task 3' },
          { id: 'card-4', content: 'Task 4' },
        ],
      },
      {
        id: 'list-3',
        title: 'Done',
        cards: [
          { id: 'card-5', content: 'Task 5' },
          { id: 'card-6', content: 'Task 6' },
        ],
      },
    ]
}
  


function Board() {
  return (
    <div className='Board'>
      {data.lists.map((list) => (
        <List list={list} key={list.id}/>
      ))}
      <div className='add_list'>
        Add List
      </div>
    </div>
  )
}

export default Board;
