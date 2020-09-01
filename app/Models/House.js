
console.log(0)
export default class House {
  // Object Destructuring
  constructor({_id, bedrooms, bathrooms, year, price, imgUrl, description, levels}) {
    console.log(2);
    this.id = _id 
    this.bed = bedrooms
    this.bath = bathrooms
    this.year = year
    this.levels = levels
    this.price = price
    this.img = imgUrl
    this.description = description
  }

  get Template() {
    return `            
    <div class="col-4">
      <div class="card">
          <img class="card-img-top" src="${this.img}" alt="">
          <div class="card-body">
              <h4 class="card-title">${this.bed} Bedroom(s) - ${this.bath} Bathroom(s) - ${this.levels}Floor(s) - ${this.year}</h4>
              <p class="card-text">${this.description}</p>
              <div class="d-flex justify-content-between">
                  <button class="btn btn-outline-danger" onclick="app.housesController.removeHouse('${this.id}')">Delete</button>
                  <button class="btn btn-outline-info" onclick="app.housesController.bid('${this.id}')">+ $100</button>
                  <p>$${this.price}</p>
              </div>
          </div>
      </div>
    </div>`
  }

}