import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const PIZZAS_ENDPOINT = `http://localhost:3000/pizzas`;

class App extends Component {

  constructor(){
    super()
    this.state = {
      pizzas: [],
      pizzaToEdit: {
        topping: "",
        size: "Small",
        vegetarian: false
      }
    }
  }

  componentDidMount(){
    fetch(PIZZAS_ENDPOINT)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pizzas: data
        })
      })
      .catch(err => console.log(err))
  }

  handlePizzaEdit = pizzaID => {
    const pizzaObj = this.state.pizzas.find(pizza => pizza.id === pizzaID)
    this.setState({
      pizzaToEdit: pizzaObj
    })
  }

  handleChange = e => {
    if (e.target.name === "vegetarian") {
      const isVegetarian = e.target.value === "vegetarian"
      this.setState({
        pizzaToEdit: {
          ...this.state.pizzaToEdit,
          vegetarian: isVegetarian
        }
      })
    } else {
      this.setState({
        pizzaToEdit: {
          ...this.state.pizzaToEdit,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  handleSubmit = e => {
    // make patch fetch request to update pizza on back end
    // then update the pizzas state to include the changes
    
    const reqObj = {
       method: "PATCH",
       headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.state.pizzaToEdit)
    }
        
    
    fetch(PIZZAS_ENDPOINT + '/' + this.state.pizzaToEdit.id, reqObj)
      .then(resp => resp.json())
      .then(pizzaData => {
        // map over pizzas slice of state
        // if the id matches the id of the edited pizzas id
        // change that object
        const newPizzas = this.state.pizzas.map(pizza => {
          return pizza.id === pizzaData.id ? pizzaData : pizza
        })
        this.setState({
          pizzas: newPizzas,
          pizzaToEdit: {
            topping: "",
            size: "Small",
            vegetarian: false
          }
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizzaToEdit} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} handlePizzaEdit={this.handlePizzaEdit}/>
      </Fragment>
    );
  }
}

export default App;
