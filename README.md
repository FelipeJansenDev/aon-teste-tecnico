
# Aon teste técnico

Uma breve descrição sobre o que esse projeto faz e para quem ele é


## Stack utilizada

**Front-end:** Angular 18, Docker

**Back-end:** Node, Express, MOngoDB,Docker


## Rodando localmente

**API:**

Construa a imagem docker do backend. Acesse a pasta "/backend" e execute o comando abaixo, irá iniciar uma instância do MOngoDB e iniciar a API.

```bash
  sudo docker build -t backend .
```

Execute um a imagem

```bash
  sudo docker-compose -f api.yml up
```