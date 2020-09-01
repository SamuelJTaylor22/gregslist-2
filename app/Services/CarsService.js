import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from "./AxiosService.js";

//Public
class CarsService {

  // NOTE when using async/await the method (function) must be flagged as async
  async getCars() {
    // NOTE wait for the API to return and set the result to 'res' before moving to the next line
    let res = await api.get('cars')
    ProxyState.cars = res.data.data.map(c => new Car(c))
  }

  async removeCar(id) {
    // NOTE provide the collection and the id
    await api.delete(`cars/${id}`)
    ProxyState.cars = ProxyState.cars.filter(c => c.id !== id)
  }

  async bid(id) {
    let car = ProxyState.cars.find(c => c.id === id)
    if (!car) {
      throw new Error("Car Not found")
    }
    car.price += 100
    // NOTE put request takes in the url that includes the id, and the data to update
    let res = await api.put(`cars/${id}`, { price: car.price })
    // NOTE trigger the listeners
    ProxyState.cars = ProxyState.cars
  }

  async createCar(rawCar) {
    // NOTE post request takes the url and the data to create
    let res = await api.post('cars', rawCar)
    // this.getCars();
    let car = new Car(res.data.data)
    // NOTE the spread operator empties the contents of the inner array into the outer array
    ProxyState.cars = [...ProxyState.cars, car]
  }
}

const SERVICE = new CarsService();
export default SERVICE;
