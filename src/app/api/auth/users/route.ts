import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { userSearchSchema } from '@/lib/validations/user-validation'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const rawQuery = {
    query: searchParams.get('query') ?? '',
    page: searchParams.get('page') ?? '1',
  }

  const parsed = userSearchSchema.safeParse(rawQuery)
  if (!parsed.success) return NextResponse.json(parsed.error.issues[0].message, { status: 400 })

  const { query, page } = parsed.data

  const size = 10
  const skip = (page - 1) * size

  const where = {
    OR: [
      {
        name: { contains: query, mode: 'insensitive' as const },
      },
      {
        email: { contains: query, mode: 'insensitive' as const },
      },
    ],
  }

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: size,
        where,
        orderBy: { name: 'asc' },
      }),
      prisma.user.count({ where }),
    ])
    const totalPages = Math.ceil(Number(total) / size)
    return NextResponse.json({
      data: users,
      pagination: {
        total,
        totalPages,
      },
    })
  } catch (_) {
    return NextResponse.json({ message: 'Failed to fetch user data' }, { status: 500 })
  }
}
