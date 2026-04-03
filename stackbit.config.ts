// Example snippet for stackbit.config.ts  
export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'static', // Tells Netlify this is a static HTML site
  devCommand: 'npx serve . -p {port}', // The command to start your preview
  // ... rest of your config
});   
