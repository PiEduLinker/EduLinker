import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb';
import Template from '@/models/Template'

interface LeanTemplate {
  _id: { toString(): string }
  nome: string
  exemploUrl: string
  'disponívelPara': string[]
} 

export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const body = await req.json();
    const { nome, descricao, exemploUrl, configPadrao, disponívelPara } = body;

    if (!nome || !exemploUrl || !configPadrao || !disponívelPara) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const opcoesValidas = ['gratuito', 'premium'];
    const isValido = disponívelPara.every((tipo: string) => opcoesValidas.includes(tipo));

    if (!isValido) {
      return NextResponse.json({ error: 'O campo "disponívelPara" deve conter apenas "gratuito" ou "premium".' }, { status: 400 });
    }

    const existeTemplate = await Template.findOne({ nome });
    if (existeTemplate) {
      return NextResponse.json({ error: `Já existe um template com o nome "${nome}".` }, { status: 409 });
    }

    if (typeof configPadrao !== 'object') {
      return NextResponse.json({ error: 'O campo "configPadrao" deve ser um objeto.' }, { status: 400 });
    }

    const novoTemplate = await Template.create({
      nome,
      descricao,
      exemploUrl,
      configPadrao: JSON.stringify(configPadrao),
      disponívelPara
    });

    return NextResponse.json(novoTemplate, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar template:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB()

    const raw = await Template.find().lean() as unknown[]

    const tpl = raw as LeanTemplate[]

    const out = tpl.map((t) => ({
      id:         t._id.toString(),
      nome:       t.nome,
      imgPreview: t.exemploUrl,
      pro:        !t['disponívelPara'].includes('gratuito'),
    }))

    return NextResponse.json(out, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar templates:', error)
    return NextResponse.json(
      { erro: 'Erro ao buscar templates' },
      { status: 500 }
    )
  }
}