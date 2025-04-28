import { gerarCarrossel, gerarGaleria, gerarAulas, gerarProfessores, gerarDepoimentos } from './geradoresComuns';

export function gerarHtmlPremium(config: any): string {
  const htmlBase = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${config.titulo}</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(90deg, ${config.corFundo}, #ffffff);
            color: ${config.corTexto};
            text-align: center;
            padding: 50px;
          }
          img.logo {
            max-width: 150px;
            margin-bottom: 30px;
          }
          section {
            margin-top: 50px;
          }
          footer {
            margin-top: 80px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <img src="${config.logo}" alt="Logo" class="logo" />
        <h1>${config.titulo}</h1>
        <p>${config.descricao}</p>

        <section>
          <h2>Carrossel</h2>
          ${gerarCarrossel(config)}
        </section>

        <section>
          <h2>${config.sobre?.titulo || 'Sobre'}</h2>
          <img src="${config.sobre?.foto}" alt="Sobre" style="width:300px;" />
          <p>${config.sobre?.texto}</p>
          <button>${config.sobre?.botaoTexto}</button>
        </section>

        <section>
          <h2>Galeria</h2>
          ${gerarGaleria(config)}
        </section>

        <section>
          <h2>Aulas</h2>
          ${gerarAulas(config)}
        </section>

        <section>
          <h2>Professores</h2>
          ${gerarProfessores(config)}
        </section>

        <section>
          <h2>Depoimentos</h2>
          ${gerarDepoimentos(config)}
        </section>

        <section>
          <h2>Contato</h2>
          <p>${config.contato?.texto}</p>
          <img src="${config.contato?.imagem}" style="width:300px;" />
        </section>

        <footer>
          Powered by Edulinker Premium Template
        </footer>
      </body>
    </html>
  `;

  return htmlBase;
}
