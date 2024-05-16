import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {coursesDetails} = props
  const {id, name, imageUrl} = coursesDetails
  return (
    <Link className="list-item" to={`/courses/${id}`}>
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="course-heading">{name}</h1>
    </Link>
  )
}

export default Courses
