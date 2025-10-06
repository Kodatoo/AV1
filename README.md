# ✈️ Sistema de Cadastro de Aeronaves

Bem-vindo ao **Sistema de Cadastro de Aeronaves**!  
Este projeto foi desenvolvido em **TypeScript** e oferece uma interface de linha de comando (CLI) para gerenciar dados relacionados à aviação, como aeronaves, funcionários, peças, testes, etapas e relatórios.

---

## 📋 Funcionalidades

- ✅ **Cadastro de Aeronaves**  
  Inclui modelo, capacidade, alcance e tipo (Comercial ou Militar).

- 👷 **Cadastro de Funcionários**  
  Armazena dados como nome, telefone, endereço, usuário, senha e nível de permissão (Administrador, Engenheiro ou Operador).

- 🧩 **Cadastro de Peças**  
  Com informações de fornecedor, tipo (Nacional ou Importada) e status (Em produção, Em transporte, Pronta).

- 🧪 **Registro de Testes**  
  Tipos de teste (Elétrico, Hidráulico, Aerodinâmico) e resultado (Aprovado ou Reprovado).

- 🛠️ **Gerenciamento de Etapas**  
  Defina nome, prazo, status e associe funcionários às etapas.

- 📄 **Geração de Relatórios**  
  Baseado nas informações cadastradas de aeronaves.

---

## 🛠️ Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [readline](https://nodejs.org/api/readline.html) (interface CLI)
- [ts-node](https://typestrong.org/ts-node/) (execução de arquivos TypeScript sem compilação prévia)

---

## ▶️ Como rodar o projeto

### ✅ Pré-requisitos

- Node.js instalado  
  👉 [Baixar Node.js](https://nodejs.org/)

> **Obs:** O `npm` é instalado automaticamente com o Node.js
Instale as dependências do projeto:

npm install


(Recomendado) Instale os tipos do Node.js para desenvolvimento:

npm install @types/node --save-dev

🚀 Execução

Para rodar a aplicação em modo de desenvolvimento:

npm run dev


Este comando executa o arquivo principal via ts-node, iniciando o sistema interativo no terminal.
