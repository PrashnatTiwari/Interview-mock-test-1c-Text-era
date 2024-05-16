import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Courses from '../coursesData'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
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

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div>
        <h1 className="course-heading">Courses</h1>
        <ul className="unordered-course-list-container">
          {coursesList.map(eachItem => (
            <Courses coursesDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderProgressView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
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

export default Home
