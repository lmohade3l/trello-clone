import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
// import Item from './Item.js';
import PackingList from "./PackingList.js";
import Status from "./Status.js";


export default function App() {
  const [items, set_items] = useState([]);

  function handle_add_item(item) {
    //We can't push the new one into the array because you can not muatate an item.
    set_items((items) => [...items, item]);
  }

  function handle_delete_item(id) {
    set_items((items) => items.filter((item) => item.id !== id));
  }

  function toggle_packed(id) {
    set_items((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function delete_list() {
    const confirmed = window.confirm(
      "Are you sure you wanna delete the whole list?"
    );

    if (confirmed) set_items([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handle_add_item} />
      <PackingList
        items={items}
        onDeleteItem={handle_delete_item}
        onUpdatePacked={toggle_packed}
        onDeleteList={delete_list}
      />
      <Status items={items} />
    </div>
  );
}
