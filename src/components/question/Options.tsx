export const Options = () => {
  const options = ['A', 'B', 'C', 'D', 'E'];
  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <span>{option}</span>
          <p>{option} şıkkı.</p>
        </div>
      ))}
    </div>
  );
};