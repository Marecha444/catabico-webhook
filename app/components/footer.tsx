import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white pt-12 border-t">
      {/* Seção de clientes */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">Conheça alguns clientes da Jadlog</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Siga o caminho de já trabalha conosco e encontre as melhores soluções logísticas.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <Image
              src="/images/home_clientes01.webp"
              alt="Clientes da Jadlog: Meli+, Amazon, Enjoei, Via, +Soma, O Boticário, Privalia, Arezzo, Electrolux, Britânia, Petz, Renner, Nestlé"
              width={1200}
              height={200}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Links de navegação */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-sm md:text-base gap-y-2">
          <Link href="https://www.jadlog.com.br/jadlog/quemsomos" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Sobre a Jadlog
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/servicos" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Produtos e Serviços
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/unidades" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Unidades e Franquias
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/tecnologia" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Tecnologia
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/sustentabilidade" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Sustentabilidade
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/lgpd" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            LGPD
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/publicacoes/noticia" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Notícias
          </Link>
        </div>

        <div className="flex flex-wrap justify-center text-sm md:text-base mt-4 mb-8 gap-y-2">
          <Link href="https://www.jadlog.com.br/jadlog/simulacao" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Cotação de Valores
          </Link>
          <Link href="#" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Atendimento
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/trabalheconosco" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Trabalhe Conosco
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/CodigodeConduta.pdf" className="px-3 py-1 text-gray-700 hover:text-[#ff0030]">
            Código de Conduta
          </Link>
          <Link href="https://www.jadlog.com.br/jadlog/politicaprivacidade.pdf" className="px-3 py-1 text-gray-700 hover:text-[#ff0030] font-medium">
            Política de Privacidade
          </Link>
        </div>
      </div>

      {/* Rodapé com copyright e redes sociais */}
      <div className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image src="/images/logo_home.webp" alt="Jadlog" width={120} height={40} className="h-8 w-auto" />
              <span className="text-sm text-gray-500 ml-4">©2021 Jadlog - Todos os direitos reservados</span>
            </div>

            <div className="flex items-center">
              <div className="mr-4 text-sm text-gray-500">Visite a Jadlog:</div>
              <div className="flex space-x-2">
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-[#ff0030] text-gray-600 hover:text-white rounded-sm transition-colors"
                >
                  <Facebook size={18} />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-[#ff0030] text-gray-600 hover:text-white rounded-sm transition-colors"
                >
                  <Linkedin size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
