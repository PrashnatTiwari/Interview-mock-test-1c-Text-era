import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetail extends Component {
  state = {
    courseData: {},
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getCourseDetailData()
  }

  getFormattedData = data => ({
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    name: data.name,
  })

  getCourseDetailData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      console.log(updatedData)
      this.setState({
        courseData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {courseData} = this.state
    const {name, imageUrl, description} = courseData
    return (
      <div className="card-detail-container">
        <img src={imageUrl} className="course-big-image" alt="website logo" />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderProgressView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1>OOPS! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getCoursesData()}
      >
        Retry
      </button>
    </>
  )

  renderAllComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderProgressView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderAllComponent()}
      </div>
    )
  }
}

export default CourseDetail
