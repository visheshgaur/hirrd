
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Onboarding from './pages/onboarding'
import LandingPage from './pages/LandingPage'
import './App.css'
import { Button } from './components/ui/button'
import JobListing from './pages/job-listing'
import JobPage from './pages/job'
import MyJobs from './pages/my-jobs'
import PostJob from './pages/post-job'
import SavedJobs from './pages/saved-job'
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from './components/protected-route'

function App() {
  const router=createBrowserRouter([
    {
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<LandingPage/>
        },
        {
          path:'/onboarding',
        
          element:(
            <ProtectedRoute>
          <Onboarding/>
          </ProtectedRoute>
          ),

       
        },
        {
          path:'/job-listing',
          element:(
            <ProtectedRoute>
              <JobListing/>
            </ProtectedRoute>
          ),
        },
        {
          path:'/job/:id',
          element:(
            <ProtectedRoute>
             <JobPage/>
            </ProtectedRoute>
          ),
        },
        {
          path:'/jobs',
          element:(
            <ProtectedRoute>
              <JobListing/>
            </ProtectedRoute>
          ),
        },
        {
          path:'/my-jobs',
          element:(
            <ProtectedRoute>
              <MyJobs/>
            </ProtectedRoute>
          )
        },
        {
          path:'/post-job',
          element:(
            <ProtectedRoute>
              <PostJob/>
            </ProtectedRoute>
          ),
        },
        {
          path:'/saved-job',
          element:(
            <ProtectedRoute>
              <SavedJobs/>
            </ProtectedRoute>
          ),
        },
        
      ]

    }
  ])

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
    </ThemeProvider>

    </>
  )
}

export default App
