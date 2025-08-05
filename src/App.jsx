import { useState } from 'react'
import Navigation from './components/Navigation'
import MockInvestment from './components/MockInvestment'
import MyStocks from './components/MyStocks'
import News from './components/News'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('mock-investment')

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'mock-investment':
        return <MockInvestment />
      case 'my-stocks':
        return <MyStocks />
      case 'news':
        return <News />
      default:
        return <MockInvestment />
    }
  }

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {renderActiveTab()}
      </main>
    </div>
  )
}

export default App
