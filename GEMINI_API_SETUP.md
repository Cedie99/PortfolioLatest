# Gemini API Setup & Troubleshooting

## Common Issues & Solutions

### 🚨 429 Quota Exceeded Error

If you're seeing quota exceeded errors, here are the solutions:

#### **Quick Fixes:**

1. **Wait 35 seconds** - The error message shows exactly when you can try again
2. **Switch to a different model** - We've updated the code to use `gemini-1.5-flash` which has better quotas
3. **Check your API key usage** at https://ai.dev/rate-limit

#### **Free Tier Limitations:**

- **gemini-2.0-flash-lite**: Very strict limits (15 requests/minute, 1500 requests/day)
- **gemini-1.5-flash**: Higher limits (15 requests/minute, 1500 requests/day, but better token allowance)

#### **Getting a New API Key:**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Delete your current API key if it's compromised
3. Create a new one
4. Replace it in your `.env` file

#### **Upgrading to Paid Plan:**

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Enable billing for your project
- This removes most rate limits

## Environment Setup

1. Create a `.env` file in your project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

2. Restart your development server after changing the API key.

## Recent Improvements Made:

✅ **Switched to gemini-1.5-flash** for better quota limits  
✅ **Added request throttling** to prevent hitting rate limits  
✅ **Improved error handling** with exponential backoff  
✅ **Fallback responses** when API is unavailable  
✅ **Better retry logic** with 3 attempts

The chatbot will now work better even when hitting quotas, providing fallback responses for common questions about Cedrick's portfolio.
