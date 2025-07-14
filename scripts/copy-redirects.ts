import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const sourceFile = resolve('_dist_redirects')
const targetFile = resolve('dist/_redirects')

try {
  if (existsSync(sourceFile)) {
    copyFileSync(sourceFile, targetFile)
    console.log('✅ Redirects file copied successfully')
  } else {
    console.log('⚠️  Source redirects file not found, skipping copy')
  }
} catch (error) {
  console.error('❌ Failed to copy redirects file:', error)
  process.exit(1)
}