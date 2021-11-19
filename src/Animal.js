
function Animal(props) {
    return (<div className="Animal">
        <h2> Name: </h2>
        <h3>{props.animalProp.name}</h3>
        <h2> Age: </h2>
        <h3>{props.animalProp.age}</h3>
        <h2> Breed: </h2>
        <h3>{props.animalProp.breed}</h3>
        <h2> Caretaker_id: </h2>
        <h3>{props.animalProp.caretaker_id}</h3>
        <img className="AnimalImage" src={props.animalProp.image} alt={props.animalProp.name} />
        <br />

        <button onClick={() => {
            props.deleteAnimal(props.animalProp.id)
        }}> Delete Animal </button>
    </div >)
}
export default Animal