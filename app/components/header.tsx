import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_home.webp"
            alt="Sua encomenda no melhor caminho"
            width={180}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-gray-700 hover:text-[#ff0030] font-medium">
            Início
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#ff0030] font-medium">
            Serviços
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#ff0030] font-medium">
            Rastreamento
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#ff0030] font-medium">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  )
}
