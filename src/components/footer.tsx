const Footer = () => {
  return (
    <footer className="mt-10 px-4">
      <div className="container mx-auto border-t">
        <p className="flex flex-col py-4 text-center text-sm text-muted-foreground sm:text-base">
          <span>
            Created by {''}
            <a
              href="https://instagram.com/rafi.amd16"
              target="_blank"
              className="font-jetbrains font-bold text-blue-500 transition hover:text-blue-700 hover:underline"
            >
              Rafi Ahmad
            </a>
          </span>
          &copy; 2025 Contact Management. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
