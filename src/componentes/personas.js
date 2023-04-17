
const Personas = ({personasMostrar, borrarPersona}) => {
    return (
        <div>
            { personasMostrar.map(({name,number,id})=>(
                <div key={name}>
                    {name} {number}
                    <button onClick={() => borrarPersona(id) }>delete</button>
                </div>
            ))}
        </div>
    )
}


export default Personas