
import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartTooltipProps {
  content?: React.ReactNode
  cursor?: boolean | object
}

interface ChartTooltipContentProps {
  indicator?: "dot" | "line" | "dashed"
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
  }>
  label?: string
  config?: ChartConfig
}

interface ChartLegendProps {
  content?: React.ReactNode
}

export function ChartTooltip({
  content,
}: ChartTooltipProps) {
  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {content}
    </div>
  )
}

export function ChartTooltipContent({ 
  indicator = "dot",
  active,
  payload,
  label,
  config
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="space-y-2">
      <div className="font-medium">{label}</div>
      <div className="space-y-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2",
              indicator === "dot" && "rounded-full",
              indicator === "line" && "h-0.5 w-4",
              indicator === "dashed" && "h-0.5 w-4 border-t-2 border-dashed",
              `bg-[var(--color-${item.dataKey})]`
            )} />
            <div className="flex gap-2">
              <span className="font-medium">{config?.[item.dataKey]?.label || item.name}:</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartLegend({ content }: ChartLegendProps) {
  return <div className="flex gap-4">{content}</div>
}

export function ChartLegendContent() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-foreground" />
      <div className="text-sm font-medium">Legend</div>
    </div>
  )
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  const cssProperties = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    }, {} as Record<string, string>)
  }, [config])

  return (
    <div
      style={cssProperties}
      className={cn("h-full w-full", className)}
      {...props}
    >
      {/* @ts-expect-error - Recharts ResponsiveContainer component type issues */}
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
} 