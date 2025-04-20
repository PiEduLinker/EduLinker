export function gerarHtml(config: any): string {
    const htmlBase = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{{titulo}}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: {{corFundo}};
              color: {{corTexto}};
              text-align: center;
              padding: 40px;
            }
            img.logo {
              max-width: 200px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <img src="{{logo}}" alt="Logo" class="logo" />
          <h1>{{titulo}}</h1>
          <p>{{descricao}}</p>
        </body>
      </html>
    `
  
    return Object.keys(config).reduce((html, chave) => {
      const regex = new RegExp(`{{${chave}}}`, 'g')
      return html.replace(regex, config[chave])
    }, htmlBase)
  }
  