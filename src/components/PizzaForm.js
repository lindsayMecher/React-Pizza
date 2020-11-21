import React from 'react';

const PizzaForm = (props) => {

  return(
      <div className="form-row">
        <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Pizza Topping"
              name="topping"
              onChange={props.handleChange}
              value={props.pizza.topping}
              />
        </div>
        <div className="col">
          <select name="size" onChange={props.handleChange} value={props.pizza.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={props.handleChange} name="vegetarian" className="form-check-input" type="radio" value="vegetarian" checked={props.pizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={props.handleChange} name="vegetarian" className="form-check-input" type="radio" value="not vegetarian" checked={!props.pizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleSubmit} >Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
