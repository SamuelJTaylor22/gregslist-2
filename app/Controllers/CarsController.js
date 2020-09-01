import { ProxyState } from "../AppState.js";
import carsService from "../Services/CarsService.js";

// private
function _drawCars() {
  let cars = ProxyState.cars
  let templates = ''
  cars.forEach(c => templates += c.Template)
  document.getElementById('data').innerHTML = templates
}


//Public
export default class CarsController {
  constructor() {
    // NOTE Add all Listeners   
    ProxyState.on('cars', _drawCars)

    // NOTE Get all appropriate data
    this.getCars();
  }

  // NOTE this allows to fetch manually if needed
  getCars() {
    try {
      carsService.getCars();
    } catch (error) {
      console.error(error)
    }
  }


  createCar() {
    event.preventDefault();
    let form = event.target
    let rawCar = {
      // @ts-ignore
      make: form.make.value,
      // @ts-ignore
      model: form.model.value,
      // @ts-ignore
      year: form.year.value,
      // @ts-ignore
      price: parseInt(form.price.value),
      // @ts-ignore
      description: form.description.value,
      // @ts-ignore
      imgUrl: form.img.value
    }
    try {
      carsService.createCar(rawCar)
    } catch (error) {
      console.error(error)
    }
  }

  removeCar(id) {
    try {
      carsService.removeCar(id)
    } catch (error) {
      console.error(error)
    }
  }

  bid(id) {
    try {
      carsService.bid(id)
    } catch (error) {
      console.error(error)
    }
  }


}
