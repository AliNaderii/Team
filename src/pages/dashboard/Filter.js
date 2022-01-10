export default function Filter({ filters, changeFilter }) {
  const handleClick = (filter) => {
    changeFilter(filter);
    console.log(filter);
  };

  return (
    <div>
      <h5>Filter by</h5>
      <div className='filter-container'>
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
