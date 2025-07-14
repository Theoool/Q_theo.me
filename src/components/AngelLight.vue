<script setup lang="ts">
import { GlowFilter } from '@pixi/filter-glow'
import { Application, Graphics } from 'pixi.js'

const el = useTemplateRef('el')

let w = window.innerWidth / 10
let h = window.innerHeight / 10

// 光束参数
const LIGHT_CENTER_X = w / 2
const LIGHT_CENTER_Y = h / 4
const LIGHT_WIDTH = 120
const LIGHT_HEIGHT = h * 0.6

const mountedScope = effectScope()

// 创建柔和的光束
function createSoftLight(app: Application) {
  const lightGroup = new Graphics()

  // 主光束 - 中心最亮
  const mainBeam = new Graphics()
  mainBeam.beginFill(0xFFFFAA, 0.4)
  mainBeam.moveTo(LIGHT_CENTER_X - LIGHT_WIDTH / 4, LIGHT_CENTER_Y)
  mainBeam.lineTo(LIGHT_CENTER_X + LIGHT_WIDTH / 4, LIGHT_CENTER_Y)
  mainBeam.lineTo(LIGHT_CENTER_X + LIGHT_WIDTH / 2, LIGHT_CENTER_Y + LIGHT_HEIGHT)
  mainBeam.lineTo(LIGHT_CENTER_X - LIGHT_WIDTH / 2, LIGHT_CENTER_Y + LIGHT_HEIGHT)
  mainBeam.closePath()
  mainBeam.endFill()

  // 外层光晕 - 更柔和
  const outerGlow = new Graphics()
  outerGlow.beginFill(0xFFFFAA, 0.15)
  outerGlow.moveTo(LIGHT_CENTER_X - LIGHT_WIDTH / 3, LIGHT_CENTER_Y)
  outerGlow.lineTo(LIGHT_CENTER_X + LIGHT_WIDTH / 3, LIGHT_CENTER_Y)
  outerGlow.lineTo(LIGHT_CENTER_X + LIGHT_WIDTH * 0.8, LIGHT_CENTER_Y + LIGHT_HEIGHT)
  outerGlow.lineTo(LIGHT_CENTER_X - LIGHT_WIDTH * 0.8, LIGHT_CENTER_Y + LIGHT_HEIGHT)
  outerGlow.closePath()
  outerGlow.endFill()

  // 最外层扩散光
  const diffuseLight = new Graphics()
  diffuseLight.beginFill(0xFFFFAA, 0.08)
  diffuseLight.moveTo(LIGHT_CENTER_X - LIGHT_WIDTH / 2, LIGHT_CENTER_Y)
  diffuseLight.lineTo(LIGHT_CENTER_X + LIGHT_WIDTH / 2, LIGHT_CENTER_Y)
  diffuseLight.lineTo(LIGHT_CENTER_X + LIGHT_WIDTH * 1.2, LIGHT_CENTER_Y + LIGHT_HEIGHT)
  diffuseLight.lineTo(LIGHT_CENTER_X - LIGHT_WIDTH * 1.2, LIGHT_CENTER_Y + LIGHT_HEIGHT)
  diffuseLight.closePath()
  diffuseLight.endFill()

  // 添加发光滤镜
  const glowFilter = new GlowFilter({
    distance: 40,
    outerStrength: 2,
    innerStrength: 0.5,
    color: 0xFFFFAA,
    quality: 0.8,
  })

  // 组合所有光层
  lightGroup.addChild(diffuseLight)
  lightGroup.addChild(outerGlow)
  lightGroup.addChild(mainBeam)

  lightGroup.filters = [glowFilter]

  return lightGroup
}

async function setup() {
  if (el.value == null)
    return

  const app = new Application()
  await app.init({
    background: 'transparent',
    antialias: true,
    resolution: window.devicePixelRatio,
    resizeTo: el.value,
    eventMode: 'none',
    autoDensity: true,
  })
  el.value.appendChild(app.canvas)

  // 创建柔和光束
  const softLight = createSoftLight(app)
  app.stage.addChild(softLight)

  // 柔和的呼吸动画
  app.ticker.add(() => {
    const t = Date.now() / 4000

    // 缓慢的透明度变化，模拟光的呼吸
    const breathe = 0.7 + Math.sin(t) * 0.2
    softLight.alpha = breathe

    // 轻微的摇摆效果
    const sway = Math.sin(t * 0.7) * 0.02
    softLight.rotation = sway

    // 光束宽度的微妙变化
    const pulse = 1 + Math.sin(t * 1.5) * 0.05
    softLight.scale.x = pulse
  })

  mountedScope.run(() => {
    useEventListener('resize', () => {
      w = window.innerWidth
      h = window.innerHeight
      // 重新调整光束位置
      softLight.x = (w - LIGHT_CENTER_X) / 2
      softLight.y = 0
    })
    onScopeDispose(() => {
      app?.destroy(true, { children: true, texture: true, textureSource: true })
    })
  })
}

onMounted(async () => {
  await setup()
})

onUnmounted(() => {
  mountedScope.stop()
})
</script>

<template>
  <div ref="el" z--3 absolute size-screen left-0 right-0 top-0 bottom-0 pointer-events-none />
</template>
