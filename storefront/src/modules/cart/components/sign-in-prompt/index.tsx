import { Button, Heading, Text } from "@medusajs/ui"
import { User, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <Heading level="h3" className="text-lg font-semibold text-gray-900 mb-1">
              Já tem uma conta?
            </Heading>
            <Text className="text-sm text-gray-600">
              Faça login para uma experiência personalizada e mais rápida.
            </Text>
          </div>
        </div>
        <LocalizedClientLink href="/account">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors" data-testid="sign-in-button">
            Entrar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
