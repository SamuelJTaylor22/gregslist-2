import { ProxyState } from "../AppState.js";
import jobsService from "../Services/JobsService.js";

// private
function _drawJobs() {
  let jobs = ProxyState.jobs
  let templates = ''
  jobs.forEach(c => templates += c.Template)
  document.getElementById('data').innerHTML = templates
}

function _drawForm(){
  let template = `
  <div class="col" >
                <form onsubmit="app.jobsController.createJob()" class="form-inline">
                    <div class="form-group p-1">
                        <label class="mr-1" for="company">Company</label>
                        <input type="text" name="company" id="company" class="form-control" placeholder="Company...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="jobTitle">Job Title</label>
                        <input type="text" name="jobTitle" id="jobTitle" class="form-control" placeholder="Job Title...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="rate">Pay</label>
                        <input type="number" name="rate" id="rate" class="form-control" placeholder="Pay..." min="1900"
                            max="2021">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="hours">Hours</label>
                        <input type="number" name="hours" id="hours" class="form-control" placeholder="Hours...">
                    </div>
                    <div class="form-group p-1">
                        <label class="mr-1" for="description">Description</label>
                        <input type="text" name="description" id="description" class="form-control"
                            placeholder="Description...">
                    </div>
                    <button type="submit" class="btn btn-outline-success">Add Job</button>
                </form>
            </div>
  `
document.getElementById('form').innerHTML = template
}

//Public
export default class JobsController {
  constructor() {
    // NOTE Add all Listeners   
    ProxyState.on('jobs', _drawJobs)

    // NOTE Get all appropriate data
    this.getJobs();
  }

  // NOTE this allows to fetch manually if needed
  getJobs() {
    try {
      jobsService.getJobs();
    } catch (error) {
      console.error(error)
    }
  }


  createJob() {
    event.preventDefault();
    let form = event.target
    let rawJob = {
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
      jobsService.createJob(rawJob)
    } catch (error) {
      console.error(error)
    }
  }

  removeJob(id) {
    try {
      jobsService.removeJob(id)
    } catch (error) {
      console.error(error)
    }
  }

  apply(id) {
    try {
      jobsService.apply(id)
    } catch (error) {
      console.error(error)
    }
  }

  drawPage(){
    _drawJobs()
    _drawForm()
  }

}
