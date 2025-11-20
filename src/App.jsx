import { useState } from 'react'
import Header from './components/Header'
import CardGrid from './components/CardGrid'

function App() {
  const [language, setLanguage] = useState('hi') // default to Hindi as a common state language
  const [stateName, setStateName] = useState('')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-sky-50">
      <Header
        language={language}
        stateName={stateName}
        onChangeLanguage={setLanguage}
        onChangeState={setStateName}
        search={search}
        setSearch={setSearch}
      />

      <main className="py-4">
        <CardGrid language={language} stateName={stateName} search={search} />
      </main>

      <footer className="text-center text-xs text-slate-500 py-6">
        Made for farmers – simple, clear and in your language.
      </footer>
    </div>
  )
}

export default App
