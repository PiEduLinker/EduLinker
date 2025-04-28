export const gerarCarrossel = (config: any) =>
    (config.carrossel || [])
      .map(
        (item: any) =>
          `<a href="${item.link}" target="_blank">
            <img src="${item.imagem}" alt="Carrossel" style="width: 100%; max-width: 600px; margin-bottom: 20px;" />
          </a>`
      )
      .join('');
  
  export const gerarGaleria = (config: any) =>
    (config.galeria || [])
      .map(
        (item: any) =>
          `<img src="${item.imagem}" alt="Galeria" style="width: 200px; margin: 5px;" />`
      )
      .join('');
  
  export const gerarAulas = (config: any) =>
    (config.aulas || [])
      .map(
        (item: any) =>
          `<div style="margin: 10px;"><img src="${item.foto}" style="width:100px;" /><p>${item.titulo}</p></div>`
      )
      .join('');
  
  export const gerarProfessores = (config: any) =>
    (config.professores || [])
      .map(
        (item: any) =>
          `<div style="margin: 10px;"><img src="${item.foto}" style="width:80px;" /><p>${item.texto}</p></div>`
      )
      .join('');
  
  export const gerarDepoimentos = (config: any) =>
    (config.depoimentos || [])
      .map(
        (item: any) =>
          `<div style="border:1px solid #ccc; padding:10px; margin:10px;">
             <img src="${item.foto}" style="width:60px;" />
             <h4>${item.nome}</h4>
             <p>"${item.texto}"</p>
          </div>`
      )
      .join('');
  