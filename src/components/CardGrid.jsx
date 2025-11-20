import { useEffect, useState } from 'react'

function Card({ title, subtitle, description, badge }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {badge && <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">{badge}</span>}
      </div>
      {description && <p className="text-sm text-slate-600 mt-2 line-clamp-3">{description}</p>}
    </div>
  )
}

export default function CardGrid({ stateName, language, search }) {
  const [tab, setTab] = useState('seeds')
  const [data, setData] = useState({ seeds: [], plants: [], instruments: [], subsidies: [] })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchAll = async () => {
    const params = new URLSearchParams()
    if (stateName) params.set('state', stateName)
    if (language) params.set('language', language)
    if (search) params.set('q', search)

    const endpoints = {
      seeds: `${baseUrl}/api/seeds?${params.toString()}`,
      plants: `${baseUrl}/api/plants?${params.toString()}`,
      instruments: `${baseUrl}/api/instruments?${params.toString()}`,
      subsidies: `${baseUrl}/api/subsidies?${params.toString()}`,
    }
    const [seeds, plants, instruments, subsidies] = await Promise.all(
      Object.values(endpoints).map(url => fetch(url).then(r => r.json()).catch(()=>[]))
    )
    setData({ seeds, plants, instruments, subsidies })
  }

  useEffect(() => { fetchAll() }, [stateName, language, search])

  const tabs = [
    { key: 'seeds', label: 'Seeds' },
    { key: 'plants', label: 'Plants' },
    { key: 'instruments', label: 'Instruments' },
    { key: 'subsidies', label: 'Subsidies' },
  ]

  const list = data[tab] || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-full text-sm border ${tab===t.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center text-slate-500 text-sm bg-white border border-dashed border-slate-300 rounded-xl p-8">
          No data yet. Add items via the database viewer or API.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {list.map((item) => (
            <Card
              key={item.id || item._id}
              title={item.name || item.title}
              subtitle={item.crop || item.category || item.department}
              description={item.description || item.notes || item.pest_management || item.how_to_apply}
              badge={item.state || item.language}
            />
          ))}
        </div>
      )}
    </div>
  )
}
