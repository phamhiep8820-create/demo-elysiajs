import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="vi">
//       <head>
//         <script src="https://cdn.tailwindcss.com"></script>
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }
