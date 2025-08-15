"use client"
import { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Camera } from '@/lib/types'
import { formatDate, newId } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { FileUploadXLSX } from '@/components/file-upload-xlsx'

export default function CamerasPage() {
  const items = useAppStore((s) => s.cameras)
  const addCamera = useAppStore((s) => s.addCamera)
  const setCameras = useAppStore((s) => s.setCameras)
  const [form, setForm] = useState<Omit<Camera, 'id'>>({
    name: '',
    location: '',
    model: '',
    installedAt: new Date().toISOString().slice(0, 10),
    status: 'active',
  })

  const columns = useMemo<ColumnDef<Camera>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: '이름' },
      { accessorKey: 'location', header: '위치' },
      { accessorKey: 'model', header: '모델' },
      {
        accessorKey: 'installedAt',
        header: '설치일',
        cell: ({ row }) => formatDate(row.original.installedAt),
      },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
    ],
    [],
  )

  const addItem = () => {
    const id = newId('CAM')
    addCamera({ id, ...form })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>카메라 등록</CardTitle>
        <div className="grid gap-3 md:grid-cols-5">
          <Input placeholder="이름" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="위치" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input placeholder="모델" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          <Input type="date" value={form.installedAt} onChange={(e) => setForm({ ...form, installedAt: e.target.value })} />
          <select
            className="h-9 rounded-md border border-input bg-white px-2 text-sm"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as Camera['status'] })}
          >
            <option value="active">active</option>
            <option value="maintenance">maintenance</option>
            <option value="inactive">inactive</option>
            <option value="offline">offline</option>
          </select>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button onClick={addItem}>추가</Button>
          <FileUploadXLSX<Partial<Camera>>
            label="엑셀로 가져오기"
            onData={(rows) => {
              const mapped: Camera[] = rows
                .filter((r) => r.name && r.location)
                .map((r, idx) => ({
                  id: newId('CAM-UP'),
                  name: String(r.name),
                  location: String(r.location),
                  model: String(r.model ?? 'unknown'),
                  installedAt: String(r.installedAt ?? new Date().toISOString().slice(0, 10)),
                  status: (r.status as any) ?? 'active',
                }))
              setCameras([...mapped, ...items])
            }}
          />
        </div>
      </Card>

      <DataTable columns={columns} data={items} globalFilterPlaceholder="이름, 위치, 모델 검색" />
    </div>
  )
}

function StatusBadge({ status }: { status: Camera['status'] }) {
  const color =
    status === 'active' ? 'border-green-600 bg-green-50 text-green-700' :
    status === 'maintenance' ? 'border-amber-600 bg-amber-50 text-amber-700' :
    status === 'inactive' ? 'border-slate-400 bg-slate-50 text-slate-600' :
    'border-red-600 bg-red-50 text-red-700'
  return <Badge className={color}>{status}</Badge>
}
