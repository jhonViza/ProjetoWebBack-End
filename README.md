**Projeto Web Back-End - Sistema de Busca de Websites**

**Descrição**
Aplicação web Node.js com Express que permite cadastrar websites e buscar por palavras-chave associadas a eles. Usa MongoDB para armazenamento dos dados.

---

**Pré-requisitos**

- Node.js instalado (versão >= 14)
- MongoDB instalado e rodando localmente (padrão na porta 27017)

---

**Como rodar o projeto**

1. Clone o repositório:

   ```bash
    git clone https://github.com/jhonViza/ProjetoWebBack-End.git
    cd ProjetoWebBack-End

2. Instale as dependências:
   npm install

3. Certifique-se que o MongoDB está rodando. No Windows, por exemplo:
   net start MongoDB

4. Inicie o servidor:
   npm start

5. Abra o navegador e acesse:
   http://localhost:3000/login
   
---

**Como testar o funcionamento**

I. Faça login (Usuário fixo: admin@teste.com / Senha: 123456)
II. Na página inicial, cadastre um website:
    Informe a URL completa (ex: https://exemplo.com)
    Informe as palavras-chave associadas (separadas por vírgula)

III. Use a busca para pesquisar por uma palavra-chave cadastrada.


