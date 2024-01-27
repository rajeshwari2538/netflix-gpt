
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Browse from './Browse'
import Login from './Login'
import WatchMovie from './WatchMovie'
import Header from './Header'
import ErrorPage from './ErrorPage'

const Body = () => {


  return (
    <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/browse" element={<Browse/>}/>
            <Route path='/movie/:movieId' element={<WatchMovie />}/>

            <Route path='*' element={<Navigate to="/error" />} />
            <Route path='/error' element={<ErrorPage />} />
          </Routes>
        </Router>
    </div>
  )
}

export default Body