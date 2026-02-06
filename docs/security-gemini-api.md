# Secure Gemini API Integration (Hackathon-ready)

This project currently runs as a pure front-end prototype. That means any API key used in the browser is visible to users. For a secure submission, keep keys out of the client and use a minimal server or serverless proxy.

## Recommended approach (proxy)
1. Create a lightweight backend endpoint (Cloud Run, Vercel, Netlify, or Firebase Functions).
2. Store the `GEMINI_API_KEY` in the platform’s secrets manager.
3. Proxy client requests to the Gemini API and return only the JSON payload needed by the UI.

## Minimal request flow
```
Browser UI -> /api/gemini (proxy) -> Gemini API -> /api/gemini -> Browser UI
```

## Client-side safety checklist
- ✅ Never commit keys to GitHub.
- ✅ Use environment secrets in CI/CD.
- ✅ Set HTTP referrer restrictions for any dev keys.
- ✅ Rotate keys before submission if they were ever exposed.

## Local prototype (acceptable for demo only)
For local demos, use `window.OMNI_CONFIG` or localStorage (see README) and **avoid** pushing keys to GitHub.
