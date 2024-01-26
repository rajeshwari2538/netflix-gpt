
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Browse from './Browse'
import Login from './Login'
import WatchMovie from './WatchMovie'
import Header from './Header'

const Body = () => {


  return (
    <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/browse" element={<Browse/>}/>
            <Route path='/movie/:movieId' element={<WatchMovie />}/>
          </Routes>
        </Router>
    </div>
  )
}

export default Body