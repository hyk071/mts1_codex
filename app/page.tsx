"use client"
import { Card, CardTitle } from '@/components/ui/card'
import { CameraStatusChart } from '@/components/charts/camera-status-chart'
import { useAppStore } from '@/lib/store'

export default function Page() {
  const cameras = useAppStore((s) => s.cameras)
  const schedules = useAppStore((s) => s.schedules)
  const logs = useAppStore((s) => s.logs)

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardTitle>요약</CardTitle>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{cameras.length}</div>
            <div className="text-xs text-muted-foreground">카메라</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{schedules.length}</div>
            <div className="text-xs text-muted-foreground">점검일정</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{logs.length}</div>
            <div className="text-xs text-muted-foreground">최근 로그</div>
          </div>
        </div>
      </Card>
      <Card className="md:col-span-2">
        <CardTitle>상태 분포</CardTitle>
        <CameraStatusChart cameras={cameras} />
      </Card>
    </div>
  )
}
