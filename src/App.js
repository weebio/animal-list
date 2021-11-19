
import './App.css';
import { useEffect, useState } from 'react'
import Animal from './Animal';

function App() {

  const [animals, setAnimals] = useState([])
  console.log("State of data in useState", animals)

  useEffect(() => {
    fetch("http://localhost:9292/animals")
      .then((r) => r.json())
      .then((data) => {
        console.log(data)

        setAnimals(data)

      });
  }, [])

  const deleteAnimal = (id) => {
    console.log("deleted")

    fetch(`http://localhost:9292/animals/${id}`, {
      method: "DELETE"
    }).then((r) => r.json())
      .then((data) => {
        console.log(data)

        setAnimals(data)
      });
  }

  const createAnimal = (animalInfo) => {
    fetch(`http://localhost:9292/animals/create`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animalInfo),
    }).then((r) => r.json())
      .then((data) => {
        console.log(data)
        
        // setAnimals([animalInfo, ...animals])
        setAnimals(data)
      });
  }

  // Caretaker:
  //  animals
  //   * animal 1
  //   * animal 2
  //   * etc. it's a list!
  //  operations:
  //   * select an animal to take care of
  //   * remove an animal to no longer take care of

  const [formData, setFormData] = useState({
    image: "https://c.tenor.com/eA80AqCrKtEAAAAC/what-the-dog-doin.gif",
    name: "dog",
    age: "12 centuries",
    breed: "lab",
  })

  const onFormChanged = (event) => {
    let newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const submitForm = (event) => {
    createAnimal(formData)
    setFormData({
      image: "",
      name: "",
      age: "",
      breed: "",
    })

    event.preventDefault()
  }

  return (
    <div className="App">
      <form onSubmit={submitForm} >
        <label for="name">name:</label>
        <input type="text" name="Name" onChange={onFormChanged} value={formData.name}></input>
        <br />

        <label for="age">age:</label>
        <input type="text" name="Age" onChange={onFormChanged} value={formData.age}></input>
        <br />

        <label for="breed">breed:</label>
        <input type="text" name="Breed" onChange={onFormChanged} value={formData.breed}></input>
        <br />

        <label for="image">image:</label>
        <input type="text" name="Image" onChange={onFormChanged} value={formData.image}></input>
        <br />

        <input type="submit" className="create_animal" value="Create Animal"></input>
      </form>

      <header className="App-header">
        {
          animals.map(eachAnimal => {
            return <Animal key={eachAnimal.id} animalProp={eachAnimal} deleteAnimal={deleteAnimal} />

          })
        }
      </header>
    </div >
  );
}



export default App;
