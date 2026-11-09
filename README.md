# Redirecionador

Página simples e mobile para abrir uma oferta de uma loja. O visitante toca em VER OFERTA e segue pelo link exato configurado. Não há redirecionamento automático, JavaScript no navegador, coleta de dados ou dependências externas.

## Trocar o produto

1. Abra [config.json](./config.json) no GitHub e clique no lápis para editar.
2. Troque somente o conteúdo de `url`, mantendo aspas e estrutura:

```json
{
  "url": "https://meli.la/11rGvz5"
}
```

3. Clique em Commit changes e salve na branch main.
4. Se o repositório estiver conectado à Vercel, a nova versão será publicada automaticamente. Aguarde o deploy ficar Ready.

Não é necessário editar o HTML, clicar em botões no código ou configurar token. O link não recebe parâmetros adicionais, preservando o link de divulgação informado. A confirmação de comissão depende das regras da plataforma, não desta página.

## Outras plataformas

O domínio do link identifica Mercado Livre (`meli.la` / `mercadolivre.com.br`), Shopee (`shope.ee` / `shopee.com.br`), Amazon (`amzn.to` / `amazon.com.br`) e Magalu (`magalu.com` / `magazineluiza.com.br`). A cor e o nome da loja se ajustam automaticamente. A logo gráfica do Mercado Livre aparece apenas para os domínios correspondentes. Outras lojas exibem seu nome; domínios desconhecidos usam “loja parceira”. URLs HTTPS são obrigatórias.

Não aceite URLs de destino por parâmetros da página: o destino é alterado somente no config.json, evitando que visitantes troquem o link publicado.

## Primeira publicação na Vercel

Importe o repositório Colgatinho21902/redirecionador. Mantenha Root Directory ./ e Framework Other. O vercel.json já configura build `node build.mjs` e saída `dist`. Não há dependências nem variáveis de ambiente. Clique em Deploy.

## Conferir localmente

Execute `node build.mjs` e depois `node preview.mjs`. Abra http://127.0.0.1:5204/. O conteúdo de dist está incluído para visualização, mas é regenerado a partir de config.json a cada build/publicação.

Logo do Mercado Livre obtida do CDN usado pela página pública do próprio Mercado Livre: https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/7.51.0/mercadolibre/pt_logo_large_plus@2x.webp . A página é um acesso ao link de divulgação; não afirma ser o site oficial da loja.
