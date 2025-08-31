'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'

const getUserDashboardStats = async (userId: string) => {
  const now = new Date()
  const oneWeekAgo = subWeeks(now, 1)
  const startThisMonth = startOfMonth(now)
  const endThisMonth = endOfMonth(now)
  const startLastMonth = startOfMonth(subMonths(now, 1))
  const endLastMonth = endOfMonth(subMonths(now, 1))

  const [
    totalContacts,
    contactThisMonth,
    contactLastMonth,
    recentContactsThisWeek,
    totalAddresses,
    newAddressesThisWeek,
    recentContacts,
  ] = await Promise.all([
    prisma.contact.count({
      where: { userId },
    }),
    prisma.contact.count({
      where: {
        userId,
        createdAt: { gte: startThisMonth, lte: endThisMonth },
      },
    }),
    prisma.contact.count({
      where: {
        userId,
        createdAt: { gte: startLastMonth, lte: endLastMonth },
      },
    }),
    prisma.contact.count({
      where: {
        userId,
        createdAt: { gte: oneWeekAgo },
      },
    }),
    prisma.address.count({
      where: {
        contact: { userId },
      },
    }),
    prisma.address.count({
      where: {
        contact: { userId },
        createdAt: { gte: oneWeekAgo },
      },
    }),
    prisma.contact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        addresses: {
          select: {
            id: true,
            city: true,
          },
        },
      },
    }),
  ])

  return {
    contacts: {
      total: totalContacts,
      growth: contactThisMonth - contactLastMonth,
      recentThisWeek: recentContactsThisWeek,
      recentContacts,
    },
    addresses: {
      total: totalAddresses,
      newThisWeek: newAddressesThisWeek,
    },
  }
}

export const getAdminDashboardStats = async () => {
  const now = new Date()

  // Minggu ini
  const startThisWeek = startOfWeek(now, { weekStartsOn: 1 })
  const endThisWeek = endOfWeek(now, { weekStartsOn: 1 })

  // Minggu lalu
  const startLastWeek = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
  const endLastWeek = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })

  // 30 hari lalu
  const thirtyDaysAgo = subDays(now, 30)

  const [
    totalUsers,
    usersThisWeek,
    usersLastWeek,

    totalContacts,
    contactsThisWeek,
    contactsLastWeek,

    activeUsersLast30Days,
    allUsers,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { createdAt: { gte: startThisWeek, lte: endThisWeek } },
    }),
    prisma.user.count({
      where: { createdAt: { gte: startLastWeek, lte: endLastWeek } },
    }),

    prisma.contact.count(),
    prisma.contact.count({
      where: { createdAt: { gte: startThisWeek, lte: endThisWeek } },
    }),
    prisma.contact.count({
      where: { createdAt: { gte: startLastWeek, lte: endLastWeek } },
    }),

    prisma.user.count({
      where: { lastLogin: { gte: thirtyDaysAgo } },
    }),

    // All users
    prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        lastLogin: true,
        _count: { select: { contacts: true } },
      },
    }),

    // Recent users
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    }),
  ])

  return {
    users: {
      total: totalUsers,
      growth: usersThisWeek - usersLastWeek,
      activeLast30Days: activeUsersLast30Days,
      newThisWeek: usersThisWeek,
      all: allUsers,
      recent: recentUsers,
    },
    contacts: {
      total: totalContacts,
      growth: contactsThisWeek - contactsLastWeek,
    },
  }
}

export const getDashboardStats = async () => {
  try {
    const session = await auth()
    if (!session?.user?.id) return null

    if (session.user.role === 'admin') {
      return await getAdminDashboardStats()
    }

    return await getUserDashboardStats(session.user.id)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('Failed to fetch dashboard statistics')
  }
}
