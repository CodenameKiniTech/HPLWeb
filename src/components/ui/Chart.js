"use client"

import * as React from "react"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { Grid } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear } from "@visx/scale"
import { BarGroup } from "@visx/shape"
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip"

import { cn } from "lib/utils"

const tooltipStyles = {
  ...defaultStyles,
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  color: "hsl(var(--foreground))",
  zIndex: 40,
}

export function Chart({
  data,
  keys,
  index,
  colors,
  valueFormatter = (value) => `${value}`,
  yAxisWidth = 56,
  xAxisHeight = 56,
  className,
  ...props
}) {
  const svgRef = React.useRef(null)
  const size = useSize(svgRef)
  const { TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  })
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip()

  const width = size?.width ?? 0
  const height = size?.height ?? 0

  const xScale = React.useMemo(
    () =>
      scaleBand({
        domain: data.map((d) => d[index]),
        padding: 0.2,
      }),
    [data, index]
  )

  const yScale = React.useMemo(
    () =>
      scaleLinear({
        domain: [
          0,
          Math.max(
            ...data.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
          ),
        ],
        nice: true,
      }),
    [data, keys]
  )

  const colorScale = React.useMemo(
    () =>
      scaleBand({
        domain: keys,
        range: colors,
      }),
    [keys, colors]
  )

  xScale.rangeRound([0, width - yAxisWidth])
  yScale.range([height - xAxisHeight, 0])

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="aspect-[4/3]">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          style={{
            maxWidth: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          <Group top={0} left={yAxisWidth}>
            <Grid
              xScale={xScale}
              yScale={yScale}
              width={width - yAxisWidth}
              height={height - xAxisHeight}
              stroke="hsl(var(--border))"
              strokeOpacity={0.4}
            />
            <BarGroup
              data={data}
              keys={keys}
              height={height}
              x0={index}
              x0Scale={xScale}
              x1Scale={colorScale}
              yScale={yScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                        onMouseLeave={() => hideTooltip()}
                        onMouseMove={(event) => {
                          const containerX = event.target.getBoundingClientRect().left
                          const containerY = event.target.getBoundingClientRect().top
                          const left = bar.x + bar.width / 2
                          const top = bar.y - 16
                          showTooltip({
                            tooltipData: {
                              key: bar.key,
                              value: bar.value,
                              index: barGroup.index,
                            },
                            tooltipLeft: containerX + left,
                            tooltipTop: containerY + top,
                          })
                        }}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
            <AxisLeft
              hideAxisLine
              hideTicks
              scale={yScale}
              tickFormat={valueFormatter}
              stroke="hsl(var(--foreground))"
              tickStroke="hsl(var(--foreground))"
              tickLabelProps={{
                fill: "hsl(var(--foreground))",
                fontSize: 10,
                textAnchor: "end",
                dx: -4,
                dy: 4,
              }}
            />
            <AxisBottom
              hideAxisLine
              hideTicks
              scale={xScale}
              top={height - xAxisHeight}
              stroke="hsl(var(--foreground))"
              tickStroke="hsl(var(--foreground))"
              tickLabelProps={{
                fill: "hsl(var(--foreground))",
                fontSize: 10,
                textAnchor: "middle",
              }}
            />
          </Group>
        </svg>
        {/* {tooltipData ? (
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">
                {tooltipData.index}
              </p>
              <p className="text-sm">
                <span className="font-medium">{tooltipData.key}:</span>{" "}
                {valueFormatter(tooltipData.value)}
              </p>
            </div>
          </TooltipInPortal>
        ) : null} */}
      </div>
    </div>
  )
}

function useSize(target) {
  const [size, setSize] = React.useState(null)

  React.useLayoutEffect(() => {
    if (target.current) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.contentRect) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          })
        }
      })

      observer.observe(target.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [target])

  return size
}

export function ChartTooltip({ children }) {
  return (
    <div className="rounded-lg bg-background p-2 shadow-md">
      {children}
    </div>
  )
}

export function ChartTooltipContent({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="space-y-1">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export function ChartContainer({ children, config, className }) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
      <div className="flex flex-wrap gap-4">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: value.color }} />
            <span className="text-sm font-medium">{value.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

