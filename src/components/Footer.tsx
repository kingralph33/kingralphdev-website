const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear()

  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-center text-sm text-[oklch(0.32_0.03_270.43)]">
          &copy; 2020 - {getCurrentYear()} Ralph King. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer