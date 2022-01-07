export default function Filter({ filters, changeFilter }) {
  const handleClick = (filter) => {
    changeFilter(filter);
    console.log(filter);
  };

  return (
    <div>
      <div className='filter-container'>
        <div>Filter by:</div>
        { filters.map(filter => (
          <div
            className='filter'
            key={ filter }
            onClick={ () => handleClick(filter) }>
            { filter }
          </div>
        )) }
      </div>
    </div>
  );
}
