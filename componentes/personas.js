
const Personas = ({personasMostrar}) => {
    return (
        <div>
            {personasMostrar.map(({name,number})=>(
                <div key={name}>
                    {name} {number}
                </div>
            ))}
        </div>
    )
}

export default Personas 