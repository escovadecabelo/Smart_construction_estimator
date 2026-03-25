import fs from 'fs';
import { orcamentoLimpeza } from './src/limpeza.mjs';
import { orcamentoDemolicao } from './src/demolicao.mjs';
import { orcamentoPintura } from './src/pintura.mjs';
import { gerarPropostaHTML } from './src/generator.mjs';

/**
 * Script Principal para gerar a proposta.
 * Este script combina os dados de todos os módulos e salva a proposta final em um arquivo HTML.
 */

const dados = {
    limpeza: orcamentoLimpeza,
    demolicao: orcamentoDemolicao,
    pintura: orcamentoPintura
};

console.log('--- Iniciando Geração de Proposta Premium ---');

try {
    const html = gerarPropostaHTML(dados);
    fs.writeFileSync('proposal.html', html);
    console.log('✅ Proposta gerada com sucesso: proposal.html');
} catch (error) {
    console.error('❌ Erro ao gerar a proposta:', error.message);
}

console.log('---------------------------------------------');
