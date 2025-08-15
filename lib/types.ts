export type CameraStatus = 'active' | 'inactive' | 'maintenance' | 'offline'

export interface Camera {
  id: string
  name: string
  location: string
  model: string
  installedAt: string // ISO date
  status: CameraStatus
}

export interface Schedule {
  id: string
  cameraId: string
  title: string
  plannedDate: string // ISO date
  assignee: string
  status: 'planned' | 'done' | 'skipped'
}

export interface LogEntry {
  id: string
  cameraId: string
  timestamp: string // ISO datetime
  level: 'INFO' | 'WARN' | 'ERROR'
  message: string
}

