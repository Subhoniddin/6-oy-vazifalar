import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
)
