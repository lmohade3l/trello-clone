export default function Status({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list!</em>
      </p>
    );

  const num_items = items.length;
  const num_packed = items.filter((item) => item.packed).length;
  const percentage = Math.round((num_packed / num_items) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You've got everything. Ready to go!"
          : `You have ${num_items} items on your list and you already packed ${num_packed}(${percentage}%). `}
      </em>
    </footer>
  );
}
