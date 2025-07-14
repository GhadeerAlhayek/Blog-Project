import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

//https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})



// vite.config.js for burpsuit proxy
// change the about:config > yes > network.proxy.allow_hijacking_localhost = true (this is for firefox )
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// export default defineConfig({
//   server: {
//     host: '127.0.0.1',
//     port: 5173
//   },
//   plugins: [react()],
// })
