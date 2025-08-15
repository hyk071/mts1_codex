"use client"
import { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Schedule } from '@/lib/types'
import { camerasMock } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

export default function SchedulesPage() {
  const items = useAppStore((s) => s.schedules)
  const addSchedule = useAppStore((s) => s.addSchedule)
  const [form, setForm] = useState<Omit<Schedule, 'id'>>({
    cameraId: camerasMock[0]?.id ?? '',
    title: '',
    plannedDate: new Date().toISOString().slice(0, 10),
    assignee: '',
    status: 'planned',
  })

  const columns = useMemo<ColumnDef<Schedule>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'cameraId', header: '카메라' },
      { accessorKey: 'title', header: '제목' },
      { accessorKey: 'assignee', header: '담당자' },
      {
        accessorKey: 'plannedDate',
        header: '예정일',
        cell: ({ row }) => formatDate(row.original.plannedDate),
      },
      { accessorKey: 'status', header: '상태' },
    ],
    [],
  )

  const addItem = () => {
    const id = `SCH-${String(items.length + 1).padStart(3, '0')}`
    addSchedule({ id, ...form })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">점검일정</h2>
        <Button variant="outline" asChild>
          <Link href="/schedules/calendar">캘린더 보기</Link>
        </Button>
      </div>
      <Card>
        <CardTitle>점검일정 등록</CardTitle>
        <div className="grid gap-3 md:grid-cols-5">
          <select
            className="h-9 rounded-md border border-input bg-white px-2 text-sm"
            value={form.cameraId}
            onChange={(e) => setForm({ ...form, cameraId: e.target.value })}
          >
            {camerasMock.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.name}
              </option>
            ))}
          </select>
          <Input placeholder="제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="담당자" value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} />
          <Input type="date" value={form.plannedDate} onChange={(e) => setForm({ ...form, plannedDate: e.target.value })} />
          <select
            className="h-9 rounded-md border border-input bg-white px-2 text-sm"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as Schedule['status'] })}
          >
            <option value="planned">planned</option>
            <option value="done">done</option>
            <option value="skipped">skipped</option>
          </select>
        </div>
        <div className="mt-3">
          <Button onClick={addItem}>추가</Button>
        </div>
      </Card>

      <DataTable columns={columns} data={items} globalFilterPlaceholder="제목, 담당자 검색" />
    </div>
  )
}
