import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UpgradesPage } from './pages/UpgradeCostCalc'

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<UpgradesPage />} />
        </Routes>
    </BrowserRouter>
)

export default App
