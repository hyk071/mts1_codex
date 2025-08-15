"use client"
import { useMemo, useState } from 'react'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { Schedule } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const locales = { ko }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

type RbcEvent = { id: string; title: string; start: Date; end: Date; allDay?: boolean; resource?: Schedule }
const DnDCalendar = (withDragAndDrop as any)(Calendar as any)

export default function ScheduleCalendarPage() {
  const schedules = useAppStore((s) => s.schedules)
  const addScheduleStore = useAppStore((s) => s.addSchedule)
  const updateSchedule = useAppStore((s) => s.updateSchedule)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [form, setForm] = useState<Omit<Schedule, 'id'>>({
    cameraId: schedules[0]?.cameraId ?? 'CAM-001',
    title: '',
    plannedDate: new Date().toISOString().slice(0, 10),
    assignee: '',
    status: 'planned',
  })

  const events = useMemo<RbcEvent[]>(() => {
    return schedules.map((s) => ({
      id: s.id,
      title: `${s.cameraId} • ${s.title}`,
      start: new Date(s.plannedDate),
      end: new Date(s.plannedDate),
      allDay: true,
      resource: s,
    }))
  }, [schedules])

  const eventPropGetter = (event: RbcEvent) => {
    const s: Schedule | undefined = event.resource
    const color = s?.status === 'done' ? '#16a34a' : s?.status === 'skipped' ? '#64748b' : '#2563eb'
    return { style: { backgroundColor: color, borderColor: color } }
  }

  const onEventDrop = ({ event, start }: { event: RbcEvent; start: Date }) => {
    updateSchedule(event.id, { plannedDate: toISODate(start) })
  }

  const onSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start)
    setForm((f) => ({ ...f, plannedDate: toISODate(start) }))
  }

  const addSchedule = () => {
    const id = `SCH-CAL-${String(schedules.length + 1).padStart(3, '0')}`
    addScheduleStore({ id, ...form })
    setSelectedDate(null)
    setForm((f) => ({ ...f, title: '' }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">점검일정 캘린더</h2>
        <Button variant="outline" asChild>
          <Link href="/schedules">목록으로</Link>
        </Button>
      </div>

      {selectedDate && (
        <Card>
          <CardTitle>새 일정 추가 - {toISODate(selectedDate)}</CardTitle>
          <div className="grid gap-3 md:grid-cols-5">
            <input
              className="h-9 rounded-md border border-input bg-white px-2 text-sm"
              value={form.cameraId}
              onChange={(e) => setForm({ ...form, cameraId: e.target.value })}
              placeholder="카메라 ID"
            />
            <input
              className="h-9 rounded-md border border-input bg-white px-2 text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="제목"
            />
            <input
              className="h-9 rounded-md border border-input bg-white px-2 text-sm"
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              placeholder="담당자"
            />
            <input
              type="date"
              className="h-9 rounded-md border border-input bg-white px-2 text-sm"
              value={form.plannedDate}
              onChange={(e) => setForm({ ...form, plannedDate: e.target.value })}
            />
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
          <div className="mt-3 flex items-center gap-2">
            <Button onClick={addSchedule} disabled={!form.title || !form.cameraId}>추가</Button>
            <Button variant="outline" onClick={() => setSelectedDate(null)}>취소</Button>
          </div>
        </Card>
      )}

      <Card>
        <CardTitle>월간 보기</CardTitle>
        <div className="h-[720px]">
          <DndProvider backend={HTML5Backend}>
            <DnDCalendar
              localizer={localizer}
              culture="ko"
              events={events}
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              defaultView={Views.MONTH}
              startAccessor="start"
              endAccessor="end"
              popup
              eventPropGetter={eventPropGetter}
              selectable
              onSelectSlot={onSelectSlot}
              onEventDrop={onEventDrop}
            />
          </DndProvider>
        </div>
      </Card>
    </div>
  )
}

function toISODate(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}
