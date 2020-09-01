import { ProxyState } from "../AppState.js";
import Job from "../Models/Job.js";
import { api } from "./AxiosService.js";

//Public
class JobsService {

  // NOTE when using async/await the method (function) must be flagged as async
  async getJobs() {
    // NOTE wait for the API to return and set the result to 'res' before moving to the next line
    let res = await api.get('jobs')
    ProxyState.jobs = res.data.data.map(c => new Job(c))
  }

  async removeJob(id) {
    // NOTE provide the collection and the id
    await api.delete(`jobs/${id}`)
    ProxyState.jobs = ProxyState.jobs.filter(c => c.id !== id)
  }

  apply(id) {
    let foundJob = ProxyState.jobs.find(j => j.id == id)

    console.log(`You applied for ${foundJob.jobTitle} at ${foundJob.company}!`);
  }

  async createJob(rawJob) {
    // NOTE post request takes the url and the data to create
    let res = await api.post('jobs', rawJob)
    // this.getJobs();
    let job = new Job(res.data.data)
    // NOTE the spread operator empties the contents of the inner array into the outer array
    ProxyState.jobs = [...ProxyState.jobs, job]
  }
}

const SERVICE = new JobsService();
export default SERVICE;
