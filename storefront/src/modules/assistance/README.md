# Módulo de Assistência Técnica

Este módulo implementa uma página completa de assistência técnica especializada em produtos Apple, incluindo:

## Componentes

### `AssistanceHero`
- Banner principal com título e descrição dos serviços
- Destaque para garantias e diferenciais da empresa

### `ServicesSection`
- Apresentação dos três principais serviços:
  - Reparo de iPhone
  - Reparo de MacBook
  - Recuperação de Dados
- Cada serviço inclui imagem, descrição e lista de recursos
- Seção de diferenciais da empresa

### `ContactForm`
- Formulário completo para orçamentos e dúvidas
- Campos para informações pessoais e detalhes do problema
- Seleção do tipo de serviço
- Informações de contato e horário de funcionamento

## Funcionalidades

- **Formulário Interativo**: Validação de campos obrigatórios
- **Design Responsivo**: Adaptado para mobile e desktop
- **Imagens Otimizadas**: Utiliza as imagens existentes na pasta `/public/images/`
- **Navegação Integrada**: Link no menu principal da aplicação

## Rotas

- **URL**: `/assistencia`
- **Arquivo**: `src/app/[countryCode]/(main)/assistencia/page.tsx`

## Imagens Utilizadas

- `iphone-repair.jpg` - Reparo de iPhone
- `macbook-repair.jpg` - Reparo de MacBook
- `data-recovery.jpg` - Recuperação de Dados

## Personalização

Para personalizar o módulo:

1. **Serviços**: Edite o array `services` em `ServicesSection`
2. **Informações de Contato**: Atualize os dados em `ContactForm`
3. **Estilos**: Modifique as classes Tailwind CSS conforme necessário
4. **Formulário**: Implemente a lógica de envio real substituindo a simulação

## Dependências

- React 18+
- Next.js 14+
- Tailwind CSS
- TypeScript
