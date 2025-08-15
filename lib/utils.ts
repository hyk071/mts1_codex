export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ko-KR')
}

export function newId(prefix: string) {
  const rnd = Math.random().toString(36).slice(2, 8)
  return `${prefix}-${rnd}`
}
