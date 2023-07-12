export default function Item({item , onDeleteItem , onUpdatePacked}) {
    //FIXME passing 'item' to onClick won't work, why?
    return (
      <li>
        <input type='checkbox' value={item.packed} onChange={() => {onUpdatePacked(item.id)}} />
        <span style={item.packed? {textDecoration:'line-through'} : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={()=> onDeleteItem(item.id)}>❌</button>
      </li>
    )
  }