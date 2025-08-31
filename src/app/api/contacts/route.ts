import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { contactSearchSchema } from '@/lib/validations/contact-validation'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const session = await auth()
  if (!session?.user || !session?.user.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)

  const rawQuery = {
    query: searchParams.get('query') ?? '',
    filter: searchParams.get('filter') ?? '',
    page: searchParams.get('page') ?? '1',
  }

  const parsed = contactSearchSchema.safeParse(rawQuery)
  if (!parsed.success) return NextResponse.json(parsed.error.issues[0].message, { status: 400 })

  let { query, filter, page } = parsed.data
  page = Math.max(1, page)

  const size = 10
  let skip = (page - 1) * size

  const getBaseWhere = () => {
    if (session.user.role === 'admin') {
      return filter === 'mine' ? { userId: session.user.id } : {}
    }
    return { userId: session.user.id }
  }
  const baseWhere = getBaseWhere()

  const where = query
    ? {
        AND: [
          baseWhere,
          {
            OR: [
              { first_name: { contains: query, mode: 'insensitive' as const } },
              { last_name: { contains: query, mode: 'insensitive' as const } },
              { email: { contains: query, mode: 'insensitive' as const } },
              { phone: { contains: query, mode: 'insensitive' as const } },
            ],
          },
        ],
      }
    : baseWhere

  try {
    const total = await prisma.contact.count({ where })

    if (session.user.role === 'admin' && filter === 'mine' && total <= size && page > 1) {
      page = 1
      skip = 0
    }

    const contacts = await prisma.contact.findMany({
      where,
      skip,
      take: size,
      orderBy: { createdAt: 'desc' },
      include:
        session.user.role === 'admin'
          ? {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            }
          : undefined,
    })

    return NextResponse.json({
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / size),
      },
    })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch contacts' }, { status: 500 })
  }
}
