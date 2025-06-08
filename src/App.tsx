import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/layout";
import AllMatrices from "./pages/MatrixCreation/AllMatrices";
import { Provider } from "react-redux"
import { store } from "./store"
import MatrixView from "./pages/MatrixCreation/MatrixView";
import EmployeesCompetencies from "./pages/EmployeesCompetencies/EmployeesCompetencies";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/all-matrices" element={<AllMatrices/>} />
          <Route path="/employee-competencies" element={<EmployeesCompetencies />} />
          <Route path="/matrix/:id" element={<MatrixView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </Provider>
  );
}

export default App;