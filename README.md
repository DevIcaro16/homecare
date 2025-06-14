
### REDMED.MD CONSTRUIDO UTILIZANDO GPT ###


# 🏥 HomeCare

Aplicação monolítica construída com **Laravel** (Backend) e **React** com **InertiaJS** (Frontend), voltada para gerenciamento de atendimentos domiciliares. O sistema realiza cadastro de pacientes, gera protocolos únicos de atendimento e envia notificações via **WhatsApp** utilizando **Laravel Jobs**. O layout é responsivo e construído com **TailwindCSS**.

## ✨ Tecnologias Utilizadas

- Laravel 10+
- React + Inertia.js
- TailwindCSS
- PostgreSQL (via Docker)
- Laravel Sail (ambiente Docker)
- PHPUnit para testes automatizados
- Jobs e Filas (Queue Worker)
- Graph API v17 (WhatsApp)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/DevIcaro16/homecare.git
cd homecare
```

### 2. Instale as dependências

```bash
composer install
npm install
```

### 3. Configure o ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com as credenciais do banco, porta da API do WhatsApp etc.
php artisan key:generate
```

---

## 🐳 Rodando com Docker (Laravel Sail)

> ⚠️ Requer WSL2 + Docker Desktop no Windows (ou Docker nativo no Linux/Mac)

### (Opcional) Configure o alias do Sail

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail )'
```

### Suba os containers

```bash
sail up -d
```

### Execute as migrações do banco

```bash
sail artisan migrate
```

### Suba o front-end (Inertia + React)

```bash
sail npm run dev
```

### OBS: No caso de algum erro de versão

```bash
sail npm i
```

---

## 🧵 Jobs e Filas

O envio de mensagens via WhatsApp é feito de forma assíncrona utilizando Laravel Queues.

### Inicie o worker de jobs

```bash
sail artisan queue:work
```

---

## 🧪 Testes

Este projeto possui cobertura de testes com PHPUnit nos principais endpoints e serviços.

### Executar todos os testes

```bash
sail artisan test
```

### Executar testes filtrados

```bash
sail artisan test --filter=NomeDoTeste
```

---

## 📂 Estrutura do Projeto

```
app/
├── Http/
│   ├── Controllers/
│   └── Requests/
├── Jobs/
│   └── SendMessageJob.php
├── Models/
│   └── Attendance.php
├── Services/
│   └── SendMessage.php
routes/
└── web.php
└── auth.php
tests/
└── App/Http/Controllers
```

---

## ✅ Funcionalidades

- Cadastro de atendimentos com geração automática de protocolo
- Envio de mensagens (Protocolo) via WhatsApp ao paciente
- Jobs para envio assíncrono
- Testes com PHPUnit
- Integração total Laravel + React (via InertiaJS)
- Layout responsivo com TailwindCSS

---