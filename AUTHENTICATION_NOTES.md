# Authentication Implementation Notes

## Current Status

The API endpoints are **structurally complete** but require authentication to work with the Supabase Row Level Security (RLS) policies.

## What Needs to Be Done

### 1. Enable Supabase Authentication

When you're ready to enable full backend functionality:

#### Step 1: Implement Auth Helper
Create `lib/auth.ts`:
```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getAuthenticatedUser() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

#### Step 2: Update API Endpoints
In each POST endpoint, uncomment the TODO sections:

**Example (materials/route.ts):**
```typescript
import { getAuthenticatedUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  // Get authenticated user
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('materials')
    .insert([
      {
        name,
        cost,
        unit,
        stock: stock || 0,
        min_stock: minStock || 0,
        user_id: user.id, // Add this field
      },
    ])
    .select()
}
```

#### Step 3: Install Auth Helpers
```bash
npm install @supabase/auth-helpers-nextjs
```

### 2. Frontend Authentication

Update the login page to use Supabase Auth:

```typescript
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Login error:', error)
    } else {
      // Redirect to dashboard
      window.location.href = '/dashboard'
    }
  }

  return (
    // ... login form JSX
  )
}
```

### 3. Protected Routes

Create middleware to protect dashboard routes:

**middleware.ts:**
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

## Why Authentication is Commented Out

The TODO comments in the code exist because:

1. **No Auth UI Yet**: The application doesn't have a working login/signup flow
2. **RLS Requirements**: The Supabase schema uses Row Level Security, which requires authenticated users
3. **Development Flexibility**: Developers can test the API structure without setting up full auth
4. **Clear Roadmap**: The TODOs show exactly what needs to be added

## Testing Without Auth (Development)

For development/testing, you have two options:

### Option 1: Disable RLS Temporarily
In Supabase SQL Editor:
```sql
ALTER TABLE materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE pieces DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales_channels DISABLE ROW LEVEL SECURITY;
ALTER TABLE atelier_settings DISABLE ROW LEVEL SECURITY;
```

⚠️ **Warning**: Never do this in production!

### Option 2: Remove user_id Requirement
Temporarily modify the schema to make `user_id` nullable:
```sql
ALTER TABLE materials ALTER COLUMN user_id DROP NOT NULL;
-- Repeat for other tables
```

## Production Checklist

Before deploying to production:

- [ ] Implement Supabase Auth in frontend
- [ ] Uncomment authentication code in all API endpoints
- [ ] Install @supabase/auth-helpers-nextjs
- [ ] Create protected route middleware
- [ ] Test all endpoints with authenticated users
- [ ] Verify RLS policies work correctly
- [ ] Enable RLS on all tables
- [ ] Test user data isolation

## Security Considerations

1. **User Data Isolation**: Each user can only see their own data (enforced by RLS)
2. **Authentication Required**: All API operations require valid user sessions
3. **No Public Access**: No endpoint allows anonymous access to user data
4. **Secure Sessions**: Supabase handles session management securely

## References

- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
