
const Filtro= ( {filter, handleFilter }) => {
    return (
        <div>
            Filtrado <input 
            value={filter}
            onChange={handleFilter} />
        </div>
    )
}

export default Filtro