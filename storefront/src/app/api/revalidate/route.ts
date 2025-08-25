import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    
    if (!tag) {
      return NextResponse.json({ error: 'Tag parameter is required' }, { status: 400 })
    }
    
    // Revalidar o cache para a tag especificada
    revalidateTag(tag)
    
    return NextResponse.json({ 
      revalidated: true, 
      tag,
      now: Date.now() 
    })
  } catch (err) {
    return NextResponse.json({ 
      error: 'Error revalidating cache',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}