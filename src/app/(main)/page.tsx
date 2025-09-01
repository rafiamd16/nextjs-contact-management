'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className="space-y-4 pt-22 sm:pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-4 pb-20 text-center md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-4xl font-bold md:text-6xl"
        >
          Manage contacts <span className="text-indigo-600">intelligently</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-xl text-neutral-500"
        >
          Save, sync, and access your contacts from anywhere. Integrated with your favorite
          platforms.
        </motion.p>
        <div className="flex justify-center gap-4">
          <motion.button
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="cursor-pointer"
          >
            <Link
              href="/dashboard"
              className="rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Try it now
            </Link>
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="rounded-xl py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Key Features
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="min-h-32"
            >
              <div className="card-hover h-full rounded-xl border p-6 text-center shadow-md dark:bg-neutral-900">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Contact Management</h3>
                <p className="text-neutral-500">
                  Save complete contact details with multiple locations
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="min-h-32"
            >
              <div className="card-hover h-full rounded-xl border p-6 text-center shadow-md dark:bg-neutral-900">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">platform integration</h3>
                <p className="text-neutral-500">Connect with the Google or Github platform</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="min-h-32"
            >
              <div className="card-hover h-full rounded-xl border p-6 text-center shadow-md dark:bg-neutral-900">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Data security</h3>
                <p className="text-neutral-500">
                  Protection with email verification and encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="rounded-xl py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            How it works
          </motion.h2>

          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold">Register Account</h3>
              <p className="max-w-xs text-neutral-500">
                Create a new account with email or another platform
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden text-2xl text-indigo-600 md:block"
            >
              →
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold">Add Contact</h3>
              <p className="max-w-xs text-neutral-500">Enter your contact details and address</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="hidden text-2xl text-indigo-600 md:block"
            >
              →
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold">Access Anywhere</h3>
              <p className="max-w-xs text-neutral-500">Synchronized contacts across all devices</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Join thousands of users who have already improved their contact management
          </p>
          <Link
            href="/register"
            className="rounded-lg bg-white px-8 py-3 font-medium text-indigo-600 transition hover:bg-neutral-100"
          >
            Create a Free Account
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage
