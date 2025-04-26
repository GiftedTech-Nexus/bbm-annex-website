import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      // Main domains
      'giftedtech.web.id',
      'bbm-annex.vercel.app',
      
      // All subdomains of giftedtech.web.id 
      /\.giftedtech\.web\.id$/,
      
      // All preview deployments from Vercel 
      /\.vercel\.app$/,
      
      // Local development
      'localhost'
    ],
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
