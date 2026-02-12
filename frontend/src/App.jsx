import { useState } from 'react'
//import './App.css'
import { Navbar } from './pages/Navbar'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import { Login } from './pages/Login'
import { ContextProvider } from './context/AuthContext'
import { Register } from './pages/Register'
import { PrivateRoute } from './pages/PrivateRoute'
import { Dashboard } from './pages/Dashboad'
import { Home } from "./pages/Home";
import { FilterDepense } from './pages/FilterDepense'
import ListNote from './pages/ListNote'
import { Toaster } from 'react-hot-toast'
import ExpenseList from './pages/ExpenseList'
import { Contact } from './pages/Contact'
import ContactTable from './pages/ContactTable'
import UserListe from './pages/UserListe'


function App() {
  
  return (
      <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />

    <ContextProvider>

        <Navbar />
        {/* On utilise un container Bootstrap pour donner de l'espace au contenu */}
        <div className="container mt-4">
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/listc' element={<ContactTable/>}/>


            {/* Route protégée : Seuls les utilisateurs connectés voient /note */}
            <Route 
              path="/note" 
              element={
                <PrivateRoute>
                  <ListNote/>
                </PrivateRoute>
              } 
            />

            <Route path='/dashboad'
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
            />

            <Route path='/depense' element={
              <PrivateRoute>
                <ExpenseList/>
              </PrivateRoute>
            }
            />

            
            <Route path='/filter' element={
              <PrivateRoute>
                <FilterDepense/>
              </PrivateRoute>
            }
            />


               
            <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
            />

                <Route path='/list_user' element={
              <PrivateRoute>
                <UserListe/>
              </PrivateRoute>
            }
            />

            {/* Optionnel : Redirection accueil */}
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
          </ContextProvider>
      </BrowserRouter>
  
  )
}

export default App