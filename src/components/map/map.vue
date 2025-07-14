<script setup lang="ts">
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { nextTick, onMounted, ref } from 'vue'
import mapData from './mapjson/map.json'
import qinghai from './mapjson/qinghai.json'

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    darkMode?: boolean
    mapData: any
    arrive: any
  }>(),
  {
    width: 500,
    height: 400,
    darkMode: false,
  },
)

const arrive = props.arrive
const mapContainer = ref<HTMLDivElement>()
const selectedCity = ref<string | null>(null)
const errorMessage = ref<string>('')

let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
let pathGenerator: d3.GeoPath<any, d3.GeoPermissibleObjects>

function drawMap() {
  try {
    if (!mapContainer.value)
      return

    d3.select(mapContainer.value).selectAll('*').remove()

    svg = d3.select(mapContainer.value)
      .append('svg')
      .attr('width', props.width)
      .attr('height', props.height)
      .attr('viewBox', `0 0 ${props.width} ${props.height}`)

    const data = props.mapData
    if (!data?.objects) {
      throw new Error('地图数据格式错误')
    }

    const objectKeys = Object.keys(data.objects)
    if (objectKeys.length === 0) {
      throw new Error('地图数据中没有可用的地理对象')
    }

    const geojson = topojson.feature(data, data.objects[objectKeys[0]])

    const projection = d3.geoIdentity()
      .reflectY(true)
      .fitSize([props.width - 40, props.height - 40], geojson)

    pathGenerator = d3.geoPath().projection(projection)

    const cities = svg.selectAll('.city')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('class', 'city')
      .attr('d', pathGenerator)
      .attr('fill', '#4B4B4B')
      .attr('stroke', '#6c757d')
      .attr('stroke-width', 0.8)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)')

    cities
      .on('mouseenter', function (event, d) {
        const cityName = d.properties.name || d.properties.NAME || '未知区域'
        const isHighlighted = arrive.includes(cityName)

        d3.select(this)
          .attr('fill', isHighlighted ? '#343a40' : '#e9ecef')
          .attr('stroke', '#212529')
          .attr('stroke-width', 1.5)
          .style('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))')

        selectedCity.value = cityName
      })
      .on('mouseleave', function (event, d) {
        const cityName = d.properties.name || d.properties.NAME || '未知区域'
        const isHighlighted = arrive.includes(cityName)

        d3.select(this)
          .attr('fill', !isHighlighted ? '#4B4B4B' : '#fff')
          .attr('stroke', '#6c757d')
          .attr('stroke-width', 0.8)
          .style('filter', 'none')

        selectedCity.value = null
      })
      .on('click', (event, d) => {
        const cityName = d.properties.name || d.properties.NAME || '未知区域'
        console.log('选中城市:', cityName)
      })

    cities.each(function (d) {
      const cityName = d.properties.name || d.properties.NAME || '未知区域'
      if (arrive.includes(cityName)) {
        d3.select(this).attr('fill', '#fff')
      }
    })

    svg.selectAll('.city-label')
      .data(geojson.features)
      .enter()
      .append('text')
      .attr('class', 'city-label')
      .attr('x', d => pathGenerator.centroid(d)[0])
      .attr('y', d => pathGenerator.centroid(d)[1])
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '11px')
      .style('font-weight', '500')
      .style('fill', '#212529')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text(d => d.properties.name || d.properties.NAME || '未知区域')
  }
  catch (error) {
    console.error('绘制地图时出错:', error)
    errorMessage.value = `绘制地图失败: ${error.message}`
  }
}

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    drawMap()
  })
})
</script>

<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-wrapper" />
    <div v-if="selectedCity" class="city-tooltip">
      {{ selectedCity }}
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.map-container {
  position: relative;

  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #dee2e6;
}

.map-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-tooltip {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(33, 37, 41, 0.9);
  color: #f8f9fa;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.error-message {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #dc3545;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
}

:deep(svg) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.city) {
  will-change: fill, stroke, filter;
}

:deep(.city-label) {
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}
</style>
