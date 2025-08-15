"use client"
import { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import * as XLSX from 'xlsx'

interface Props<T = any> {
  label?: string
  onData: (rows: T[]) => void
}

export function FileUploadXLSX<T = any>({ label = '엑셀 업로드', onData }: Props<T>) {
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json<T>(sheet)
    onData(json)
    e.target.value = ''
  }

  return (
    <div className="inline-flex items-center gap-2">
      <input id="xlsx-input" type="file" accept=".xlsx,.xls" onChange={onChange} className="hidden" />
      <label htmlFor="xlsx-input">
        <Button asChild>
          <span>{label}</span>
        </Button>
      </label>
    </div>
  )
}

