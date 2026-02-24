export default function Home({ onSelect }) {
  return (
    <div>
      <h1>Scriptures</h1>
      <button onClick={() => onSelect()}>Bhagavad Gita</button>
    </div>
  );
}
