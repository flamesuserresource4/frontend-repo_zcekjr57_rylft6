import { useMemo } from 'react'

const translations = {
  en: {
    title: 'Farmer Assistant',
    subtitle: 'Simple, useful information in your state language',
    state: 'State',
    language: 'Language',
    search_placeholder: 'Search seeds, plants, instruments, subsidies...'
  },
  hi: {
    title: 'किसान सहायक',
    subtitle: 'आसान भाषा में उपयोगी जानकारी',
    state: 'राज्य',
    language: 'भाषा',
    search_placeholder: 'बीज, फसल, औज़ार, योजना खोजें...'
  },
  mr: {
    title: 'शेतकरी सहाय्यक',
    subtitle: 'सोप्या भाषेत उपयुक्त माहिती',
    state: 'राज्य',
    language: 'भाषा',
    search_placeholder: 'बियाणे, पिक, साधने, अनुदान शोधा...'
  },
  te: {
    title: 'రైతు సహాయకుడు',
    subtitle: 'మీ రాష్ట్ర భాషలో సులభమైన సమాచారం',
    state: 'రాష్ట్రం',
    language: 'భాష',
    search_placeholder: 'విత్తనాలు, పంటలు, పరికరాలు, సబ్సిడీలు వెతకండి...'
  }
}

export default function Header({ language, stateName, onChangeLanguage, onChangeState, search, setSearch }) {
  const t = useMemo(() => translations[language] || translations.en, [language])

  const states = [
    'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'
  ]
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'te', label: 'తెలుగు' }
  ]

  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
          <p className="text-slate-500 text-sm">{t.subtitle}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 w-16">{t.state}</span>
            <select value={stateName} onChange={(e) => onChangeState(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
              <option value="">All</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 w-16">{t.language}</span>
            <select value={language} onChange={(e) => onChangeLanguage(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
              {languages.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full md:w-80 px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
