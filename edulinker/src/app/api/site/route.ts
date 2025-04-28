import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Site from '@/models/Site'
import Template from '@/models/Template'
import { ObjectId } from 'mongodb'
import { gerarHtml } from '@/app/utils/gerarHtml'


export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { usuarioId, siteNome, descricao, tema, logo, templateId } = body;

    if (!usuarioId || !siteNome || !templateId) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return NextResponse.json({ erro: 'Template não encontrado.' }, { status: 404 });
    }

    const configPadrao = JSON.parse(template.configPadrao || '{}');
    const configPersonalizada = body.configuracoes || {};

    const configuracoes = {
      ...configPadrao,
      ...configPersonalizada,
    };

    const htmlContent = gerarHtml(configuracoes);
    const slug = `${siteNome.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')}-${Math.floor(Math.random() * 9999)}`;

    const vercelToken = process.env.VERCEL_TOKEN;
    const projectName = 'site-personalizados';

    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: slug,
        files: [
          {
            file: 'index.html',
            data: htmlContent,
          },
        ],
        projectSettings: { framework: null },
        project: projectName,
      }),
    });

    const resultadoDeploy = await deployResponse.json();

    if (!deployResponse.ok) {
      console.error('Erro no deploy:', resultadoDeploy);
      return NextResponse.json({ erro: 'Erro ao publicar no Vercel', detalhes: resultadoDeploy }, { status: 500 });
    }

    const deploymentId = resultadoDeploy.id;
    const automaticUrl = resultadoDeploy.url; 

    const novoSite = await Site.create({
      usuarioId: new ObjectId(usuarioId),
      siteNome,
      descricao,
      url: automaticUrl,             
      deploymentId,                
      tema: template.nome,
      logo,
      configuracoes,
      templateOriginalId: template._id,
    });

    return NextResponse.json(novoSite, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar site:', error);
    return NextResponse.json({ erro: 'Erro ao criar site' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB()

    const usuarioId = req.nextUrl.searchParams.get('usuarioId')

    if (!usuarioId) {
      return NextResponse.json({ erro: 'Usuário não informado.' }, { status: 400 })
    }

    const sites = await Site.find({ usuarioId: new ObjectId(usuarioId) }).sort({ dataCriacao: -1 })

    return NextResponse.json(sites, { status: 200 })

  } catch (error) {
    console.error('Erro ao buscar sites do usuário:', error)
    return NextResponse.json({ erro: 'Erro ao buscar sites do usuário.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { usuarioId, siteId, configuracoes } = body;

    if (!usuarioId || !siteId || !configuracoes) {
      return NextResponse.json({ erro: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    const site = await Site.findById(siteId);

    if (!site) {
      return NextResponse.json({ erro: 'Site não encontrado.' }, { status: 404 });
    }

    if (String(site.usuarioId) !== String(usuarioId)) {
      return NextResponse.json({ erro: 'Usuário não autorizado a atualizar este site.' }, { status: 403 });
    }

    const novasConfiguracoes = {
      ...site.configuracoes,
      ...configuracoes,
    };

    const htmlContent = gerarHtml(novasConfiguracoes);
    const vercelToken = process.env.VERCEL_TOKEN;
    const projectName = 'site-personalizados';

    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: site.siteNome.toLowerCase().replace(/\s+/g, '-') + `-${Math.floor(Math.random() * 9999)}`,
        files: [
          {
            file: 'index.html',
            data: htmlContent,
          },
        ],
        projectSettings: { framework: null },
        project: projectName,
      }),
    });

    const resultadoDeploy = await deployResponse.json();

    if (!deployResponse.ok) {
      console.error('Erro no deploy:', resultadoDeploy);
      return NextResponse.json({ erro: 'Erro ao atualizar site na Vercel', detalhes: resultadoDeploy }, { status: 500 });
    }

    const newDeploymentId = resultadoDeploy.id;
    const newAutomaticUrl = resultadoDeploy.url; // pega a nova URL automática

    site.configuracoes = novasConfiguracoes;
    site.deploymentId = newDeploymentId;
    site.url = newAutomaticUrl;  // atualiza a URL para a nova do deploy
    await site.save();

    return NextResponse.json(site, { status: 200 });

  } catch (error) {
    console.error('Erro ao atualizar site:', error);
    return NextResponse.json({ erro: 'Erro ao atualizar site' }, { status: 500 });
  }
}
