const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-blue-50 px-4 dark:from-neutral-950 dark:to-neutral-900">
      {children}
    </div>
  )
}

export default AuthLayout
