import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  // Use root base locally so VS Code preview/dev works,
  // and use the repo subpath only in GitHub Actions for Pages deploy.
  base: process.env.GITHUB_ACTIONS ? '/admin-portal-designdemo/' : '/',
  plugins: [react()],
}))
