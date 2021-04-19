import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import compress from 'vite-plugin-compress'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), compress(),]
})
