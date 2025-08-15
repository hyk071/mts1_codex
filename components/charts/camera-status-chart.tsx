"use client"
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Camera } from '@/lib/types'

const COLORS = {
  active: '#16a34a',
  maintenance: '#f59e0b',
  inactive: '#64748b',
  offline: '#ef4444',
}

export function CameraStatusChart({ cameras }: { cameras: Camera[] }) {
  const counts = cameras.reduce(
    (acc, c) => ({ ...acc, [c.status]: (acc[c.status] ?? 0) + 1 }),
    {} as Record<string, number>,
  )
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }))
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={(COLORS as any)[entry.name] ?? '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

