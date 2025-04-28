export function gerarHtml(config: any): string {
  //const cacheBuster = `v=${Date.now()}` -> utilizar se o site nao estiver atualizando corretamente

  const gerarCarrossel = () =>
    (config.carrossel || [])
      .map(
        (item: any) =>
          `<a href="${item.link}" target="_blank"><img src="${item.imagem}" alt="Carrossel" style="width: 100%; max-width: 600px; margin-bottom: 20px;" /></a>`
      )
      .join('')

  const gerarGaleria = () =>
    (config.galeria || [])
      .map(
        (item: any) =>
          `<img src="${item.imagem}" alt="Galeria" style="width: 200px; margin: 5px;" />`
      )
      .join('')

  const gerarAulas = () =>
    (config.aulas || [])
      .map(
        (item: any) =>
          `<div style="margin: 10px;"><img src="${item.foto}" style="width:100px;" /><p>${item.titulo}</p></div>`
      )
      .join('')

  const gerarProfessores = () =>
    (config.professores || [])
      .map(
        (item: any) =>
          `<div style="margin: 10px;"><img src="${item.foto}" style="width:80px;" /><p>${item.texto}</p></div>`
      )
      .join('')

  const gerarDepoimentos = () =>
    (config.depoimentos || [])
      .map(
        (item: any) =>
          `<div style="border:1px solid #ccc; padding:10px; margin:10px;">
             <img src="${item.foto}" style="width:60px;" />
             <h4>${item.nome}</h4>
             <p>"${item.texto}"</p>
          </div>`
      )
      .join('')

  const htmlBase = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${config.titulo}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: ${config.corFundo};
            color: ${config.corTexto};
            text-align: center;
            padding: 40px;
          }
          img.logo {
            max-width: 200px;
            margin-bottom: 20px;
          }
          section {
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <img src="${config.logo}" alt="Logo" class="logo" />
        <h1>${config.titulo}</h1>
        <p>${config.descricao}</p>

        <section>
          <h2>Carrossel</h2>
          ${gerarCarrossel()}
        </section>

        <section>
          <h2>${config.sobre?.titulo || 'Sobre'}</h2>
          <img src="${config.sobre?.foto}" alt="Sobre" style="width:300px;" />
          <p>${config.sobre?.texto}</p>
          <button>${config.sobre?.botaoTexto}</button>
        </section>

        <section>
          <h2>Galeria</h2>
          ${gerarGaleria()}
        </section>

        <section>
          <h2>Aulas</h2>
          ${gerarAulas()}
        </section>

        <section>
          <h2>Professores</h2>
          ${gerarProfessores()}
        </section>

        <section>
          <h2>Depoimentos</h2>
          ${gerarDepoimentos()}
        </section>

        <section>
          <h2>Contato</h2>
          <p>${config.contato?.texto}</p>
          <img src="${config.contato?.imagem}" style="width:300px;" />
        </section>
      </body>
    </html>
  `

  return htmlBase
}
