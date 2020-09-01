
console.log(0)
export default class Job {
  // Object Destructuring
  constructor({_id, jobTitle, company, rate, hours, description }) {
    this.id = _id 
    this.company = company
    this.jobTitle = jobTitle
    this.rate = rate
    this.hours = hours
    this.description = description
  }

  get Template() {
    return `            
    <div class="col-4">
      <div class="card">
          <div class="card-body">
              <h4 class="card-title">${this.company}- ${this.jobTitle} </h4>
              <p class="card-text">Rate:$${this.rate.toFixed(2)}/Year</p>
              <p class="card-text">${this.description}</p>
              <div class="d-flex justify-content-between">
                  <button class="btn btn-outline-danger" onclick="app.jobsController.removeJob('${this.id}')">Delete</button>
                  <button class="btn btn-outline-info" onclick="app.jobsController.apply('${this.id}')">Apply Now!</button>
              </div>
          </div>
      </div>
    </div>`
  }

}