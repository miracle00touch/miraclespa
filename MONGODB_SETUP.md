# MongoDB Setup Instructions

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (select the free tier)
4. Wait for cluster to be created (usually takes 3-5 minutes)

## Step 2: Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set user privileges to "Read and write to any database"
5. Click "Add User"

## Step 3: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for development)
4. Or add your specific IP address for production
5. Click "Confirm"

## Step 4: Get Connection String

1. Go back to "Clusters"
2. Click "Connect" button on your cluster
3. Select "Connect your application"
4. Choose "Node.js" and version "4.1 or later"
5. Copy the connection string (it looks like):
   `mongodb+srv://username:password@cluster0.abcde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

## Step 5: Configure Your App

1. In your project root, create a file called `.env.local`
2. Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.abcde.mongodb.net/miraclespa?retryWrites=true&w=majority
   ```
3. Replace:
   - `username` with your database username
   - `password` with your database password
   - `cluster0.abcde` with your actual cluster address
   - `miraclespa` with your preferred database name

## Step 6: Seed Your Database

1. Open terminal in your project directory
2. Run: `node scripts/seedData.js`
3. This will populate your database with all current therapist data

## Step 7: Test Your Setup

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000/admin
3. You should see the admin panel with your therapists loaded from MongoDB
4. Try adding/editing a therapist to verify everything works

## Important Notes:

- Keep your `.env.local` file private (it's already in .gitignore)
- The free MongoDB Atlas tier provides 512MB storage (more than enough for your spa)
- Your data will persist across deployments and server restarts
- You can view/manage your data directly in MongoDB Atlas dashboard

## Troubleshooting:

- If you get connection errors, double-check your IP whitelist in MongoDB Atlas
- Make sure your username/password are correct in the connection string
- Ensure your cluster is fully deployed before trying to connect
- Check the MongoDB Atlas status page if you're having issues
