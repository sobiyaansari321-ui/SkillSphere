import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Projects from './pages/Projects.jsx'
import Developers from './pages/Developers.jsx'
import CreateProject from './pages/CreateProject.jsx'
import MyProjects from './pages/MyProjects.jsx'
import MyRequests from './pages/MyRequests.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import EditProject from './pages/EditProject.jsx'
import EditProfile from './pages/EditProfile.jsx'
import DeveloperProfile from './pages/DeveloperProfile.jsx'
import Collaborators from './pages/Collaborators.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Login />} />

      <Route path='/signup' element={<Signup />} />

      <Route path='/dashboard' 
      element={ <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} />

      <Route path='/projects'
      element={ <ProtectedRoute>
        <Projects />
      </ProtectedRoute>} />

      <Route path='/developers'
      element={ <ProtectedRoute>
        <Developers />
      </ProtectedRoute>} />

      <Route path='/create-project'
      element={ <ProtectedRoute>
        <CreateProject />
      </ProtectedRoute>}
      />

      <Route path='/my-projects'
      element={ <ProtectedRoute>
        <MyProjects />
      </ProtectedRoute>}
      />

      <Route path='/my-requests'
      element={
        <ProtectedRoute>
          <MyRequests />
        </ProtectedRoute> }
      />

      <Route path='/projects/:id'
      element={
        <ProtectedRoute>
          <ProjectDetails />
        </ProtectedRoute>
      }
      />

      <Route path='/edit-project/:id'
      element={ <ProtectedRoute>
        <EditProject />
      </ProtectedRoute>}
      />

      <Route path='/edit-profile'
      element={<EditProfile />} />

      <Route path='/developer/:id'
      element={<DeveloperProfile />}
      />

      <Route path='/collaborators' 
      element={<Collaborators />}
      />

    </Routes>
    </BrowserRouter>
  )
}

export default App
