import GIS from "./pages/GIS/GIS";

import Analytics from "./pages/Analytics/Analytics";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";

import Projects from "./pages/Projects/Projects";

import Sites from "./pages/Sites/Sites";

import Environment from "./pages/Environment/Environment";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/dashboard"

                    element={

                        

                            <Dashboard />

                        

                    }

                />

                <Route

                    path="/projects"

                    element={

                        

                            <Projects />

                        

                    }

                />

                <Route

                    path="/sites"

                    element={

                        

                            <Sites />

                        

                    }

                />

                <Route

                    path="/environment"

                    element={

                            <Environment />

                        

                    }

                />
                <Route
                    path="/gis"
                    element={<GIS />}
                  />

                  <Route
                  path="/analytics"
                  element={<Analytics />} 
                  />

                

            </Routes>

        </BrowserRouter>

    );

}

export default App;