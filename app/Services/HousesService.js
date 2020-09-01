import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

//Public
class HousesService {

  // NOTE when using async/await the method (function) must be flagged as async
  async getHouses() {
    // NOTE wait for the API to return and set the result to 'res' before moving to the next line
    let res = await api.get('houses')
    ProxyState.houses = res.data.data.map(c => new House(c))
  }

  async removeHouse(id) {
    // NOTE provide the collection and the id
    await api.delete(`houses/${id}`)
    ProxyState.houses = ProxyState.houses.filter(c => c.id !== id)
  }

  async bid(id) {
    let house = ProxyState.houses.find(c => c.id === id)
    if (!house) {
      throw new Error("House Not found")
    }
    house.price += 100
    // NOTE put request takes in the url that includes the id, and the data to update
    let res = await api.put(`houses/${id}`, { price: house.price })
    // NOTE trigger the listeners
    ProxyState.houses = ProxyState.houses
  }

  async createHouse(rawHouse) {
    // NOTE post request takes the url and the data to create
    let res = await api.post('houses', rawHouse)
    // this.getHouses();
    let house = new House(res.data.data)
    // NOTE the spread operator empties the contents of the inner array into the outer array
    ProxyState.houses = [...ProxyState.houses, house]
  }
}

const SERVICE = new HousesService();
export default SERVICE;
