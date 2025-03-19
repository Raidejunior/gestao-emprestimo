# 2024-1-pis-g10

## Projeto feito por: Raide Junior e Thiago Nogueira.

## Para instalação e uso siga os seguintes passos:

1. Dentro da pasta 'client', execute o comando 'pnpm install'.

2. Dentro da pasta 'api', execute o comando 'composer install'.

3. Dentro ainda da pasta 'api', execute o comando 'composer dump-autoload'.

4. Levante o servidor MySQL com o xampp e execute todos os comandos presentes no arquivo 'ACME.sql' dentro da pasta 'doc'.

5. Agora, para rodar o projeto vá para dentro da pasta 'client' e depois para a pasta 'api' e 
execute o comando 'npm run dev' e 'php -S localhost:8080' respectivamente.

## Referências:

- Foi utilizado o framework CSS Bootstrap para a estilização da página, o mesmo pode ser encontrado em: https://getbootstrap.com/

- Para a utilização do modal na tela de confirmação do empréstimo foi necessário o uso do jQuery 3.5.1, disponível em: https://code.jquery.com/jquery-3.5.1.slim.min.js

- Foi utilizado o framework phputil/router para facilitar o tratamento de requisições na API, disponível em: https://github.com/thiagodp/router

- Foi utilizado o middleware phputil/cors para permitir acesso de requisições de todas as origens à API, disponível em: https://github.com/thiagodp/cors
