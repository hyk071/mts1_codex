"use client"
import { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileUploadXLSX } from '@/components/file-upload-xlsx'
import { LogEntry } from '@/lib/types'
import { useAppStore } from '@/lib/store'

export default function LogsPage() {
  const items = useAppStore((s) => s.logs)
  const addLogs = useAppStore((s) => s.addLogs)
  const [filterCamera, setFilterCamera] = useState('')
  const columns = useMemo<ColumnDef<LogEntry>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'cameraId', header: '카메라' },
      { accessorKey: 'timestamp', header: '시간' },
      { accessorKey: 'level', header: '레벨' },
      { accessorKey: 'message', header: '메시지' },
    ],
    [],
  )

  const uploadHandler = (rows: Partial<LogEntry>[]) => {
    const mapped: LogEntry[] = rows
      .filter((r) => r.cameraId && r.message)
      .map((r, idx) => ({
        id: `LOG-UP-${idx + 1}`,
        cameraId: String(r.cameraId),
        timestamp: String(r.timestamp ?? new Date().toISOString()),
        level: (r.level as any) ?? 'INFO',
        message: String(r.message),
      }))
    addLogs(mapped)
  }

  const filtered = items.filter((i) => !filterCamera || i.cameraId.includes(filterCamera))

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>로그 수집</CardTitle>
        <div className="flex flex-wrap items-center gap-3">
          <FileUploadXLSX<Partial<LogEntry>> label="로컬 엑셀 업로드" onData={uploadHandler} />
          <Button variant="outline" onClick={() => alert('원격 수집은 추후 구현 예정입니다.')}>원격 수집(추후)</Button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">카메라 필터:</span>
            <Input placeholder="CAM-001" value={filterCamera} onChange={(e) => setFilterCamera(e.target.value)} />
          </div>
        </div>
      </Card>

      <DataTable columns={columns} data={filtered} globalFilterPlaceholder="메시지/레벨 검색" />
    </div>
  )
}
