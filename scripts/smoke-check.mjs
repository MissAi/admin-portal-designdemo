import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd())

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

const checks = [
  {
    name: 'Left nav stays scrollable',
    file: 'src/screens/LeftNav.tsx',
    patterns: ["overflowY: 'auto'", 'minHeight: 0', 'WebkitOverflowScrolling: \'touch\''],
  },
  {
    name: 'Mobile shell stays full-screen on phones',
    file: 'src/App.css',
    patterns: ['height: 100dvh', 'border-radius: 0', 'box-shadow: none'],
  },
  {
    name: 'Routes still point to the expected flows',
    file: 'src/App.tsx',
    patterns: ['path="/"', 'path="/app-ordering"'],
  },
  {
    name: 'GitHub Pages base path is repo-aware',
    file: 'vite.config.ts',
    patterns: ["process.env.GITHUB_ACTIONS", "/admin-portal-designdemo/"],
  },
]

let hasFailure = false

for (const check of checks) {
  const content = read(check.file)
  const missing = check.patterns.filter((pattern) => !content.includes(pattern))

  if (missing.length > 0) {
    hasFailure = true
    console.error(`FAIL: ${check.name}`)
    console.error(`  Missing in ${check.file}: ${missing.join(', ')}`)
  } else {
    console.log(`PASS: ${check.name}`)
  }
}

if (hasFailure) {
  process.exit(1)
}

console.log('Smoke checks passed.')