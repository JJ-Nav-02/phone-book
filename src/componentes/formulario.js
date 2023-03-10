
const Formulario = ({
    addNewName,
    handleNewName,
    handleNewPhone,
    newPerson
}) => {
    return (
        <form onSubmit={addNewName} >
            <div>
                name: <input value={newPerson.name} onChange={handleNewName} />
            </div>
            <div>
                number: <input value={newPerson.phone}  onChange={handleNewPhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
 
export default Formulario