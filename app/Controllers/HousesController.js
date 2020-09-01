import { ProxyState } from "../AppState.js";
import housesService from "../Services/HousesService.js";

// private
function _drawHouses() {
  let houses = ProxyState.houses
  let templates = ''
  houses.forEach(c => templates += c.Template)
  document.getElementById('data').innerHTML = templates
}

function _drawForm(){
  let template = `
  <div class="col" >
                <form onsubmit="app.housesController.createHouse()" class="form-inline">
                    <div class="form-group p-1">
                        <label class="mr-1" for="bedrooms">Bedrooms</label>
                        <input type="text" name="bedrooms" id="bedrooms" class="form-control" placeholder="Bedrooms...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="bathrooms">Bathrooms</label>
                        <input type="text" name="bathrooms" id="bathrooms" class="form-control" placeholder="Bathrooms...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="levels">Floors</label>
                        <input type="number" name="levels" id="levels" class="form-control" placeholder="Floors...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="year">Year</label>
                        <input type="number" name="year" id="year" class="form-control" placeholder="Year..." min="1400"
                            max="2021">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="price">Price</label>
                        <input type="number" name="price" id="price" class="form-control" placeholder="Price...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="description">Description</label>
                        <input type="text" name="description" id="description" class="form-control"
                            placeholder="Description...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="img">Image Url</label>
                        <input type="url" name="img" id="img" class="form-control" placeholder="Image Url...">
                    </div>
                    <button type="submit" class="btn btn-outline-success">Add House</button>
                </form>
            </div>
  `
document.getElementById('form').innerHTML = template
}

//Public
export default class HousesController {
  constructor() {
    // NOTE Add all Listeners   
    ProxyState.on('houses', _drawHouses)

    // NOTE Get all appropriate data
    this.getHouses();
  }

  // NOTE this allows to fetch manually if needed
  getHouses() {
    try {
      housesService.getHouses();
    } catch (error) {
      console.error(error)
    }
  }


  createHouse() {
    event.preventDefault();
    let form = event.target
    let rawHouse = {
      // @ts-ignore
      make: form.bedrooms.value,
      // @ts-ignore
      model: form.bathrooms.value,
      // @ts-ignore
      year: form.year.value,
      // @ts-ignore
      price: parseInt(form.price.value),
      // @ts-ignore
      levels: parseInt(form.levels.value),
      // @ts-ignore
      description: form.description.value,
      // @ts-ignore
      imgUrl: form.img.value
    }
    try {
      housesService.createHouse(rawHouse)
    } catch (error) {
      console.error(error)
    }
  }

  removeHouse(id) {
    try {
      housesService.removeHouse(id)
    } catch (error) {
      console.error(error)
    }
  }

  bid(id) {
    try {
      housesService.bid(id)
    } catch (error) {
      console.error(error)
    }
  }

  drawPage(){
    _drawForm()
    _drawHouses()
  }


}
