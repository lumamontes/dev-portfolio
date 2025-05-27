---
title: "Testando APIs autenticadas com PHPUnit e Pest no Laravel"
publishedAt: 2024-04-16
description: "Como testar suas APIs Laravel usando PHPUnit e Pest, usando Factory, Traits e comandos personalizados para gerar tokens JWT."
isPublish: false
lang: "br"
tags: ["php", "laravel", "testing", "phpunit", "pest", "jwt", "api", "authentication", "tutorial"]
---

# Testando APIs com PHPUnit e Pest no Laravel

Recentemente precisei implementar testes de APIs no Laravel, usando PHPUnit e Pest, e achei interessante compartilhar um pouco sobre como configurar e usar essas ferramentas para futura referência.

O PHPUnit é uma ferramenta de teste de unidade para a linguagem de programação PHP. Ele fornece um framework para escrever testes de unidade, que são testes automatizados que garantem que o código funcione conforme o esperado. O Pest é uma alternativa ao PHPUnit, construído em cima dele mas com uma sintaxe um pouco mais simples.

## Configurando o PHPUnit e Pest

Confira a documentação oficial do Pest para mais detalhes sobre a instalação e configuração.

[https://pestphp.com/docs/installation](https://pestphp.com/docs/installation)

Após a instalação, podemos começar a escrever testes para nossas APIs Laravel na pasta `tests/Feature`.

### Configuração do Test Case

No PHPUnit, os casos de teste são tipicamente classes que estendem `PHPUnit\Framework\TestCase`. Usando Pest, é criado um arquivo `Pest.php` na raiz da pasta `/tests`, que é usado para configurações ou funções utilitárias globais, que podem ser usadas em todos os testes.

Nesse arquivo, por exemplo, usamos a classe base de teste do Laravel, `Tests\TestCase`, que já possui métodos de configuração e desmontagem comuns, configurações ou métodos utilitários usados em seus testes, como no exemplo abaixo:

Pest.php
```php
uses(
    Tests\TestCase::class,  
    Illuminate\Foundation\Testing\DatabaseTransactions::class,
)->in('Feature');
```

- `Tests\TestCase::class`: Esta é sua classe base de casos de teste, que pode incluir métodos de configuração e desmontagem comuns, configurações ou métodos utilitários usados em seus testes.
- `DatabaseTransactions::class`: Este trait garante que cada teste seja executado dentro de uma transação de banco de dados, que é revertida ao final do teste, garantindo um estado limpo para o próximo teste.

### Gerando um Token JWT para Autenticação

Muitas APIs utilizam a estratégia de autenticação JWT (JSON Web Token) para proteger rotas. Durante os testes, podemos criar uma função utilitária para gerar um token JWT válido para autenticação, e depois reutilizá-lo conforme necessário.

Para isso, podemos criar um Command Artisan personalizado para gerar um token JWT com base em parâmetros específicos, como o ID do usuário, ID do perfil, etc.
```bash
php artisan make:command GenerateJwtToken
```

*GenerateJwtToken.php*
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Firebase\JWT\JWT;

class GenerateJwtToken extends Command
{
    protected $signature = 'make:jwt {--user_id=1} {--profile_id=1} {--days=1}';
    protected $description = 'Generate a JWT token';

    /**
     * @return void
     */
    public function handle(): void
    {
        $secret = env('JWT_SECRET');
        $now = time();
        $exp = $this->option('days');

        $payload = [
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + ($exp * 24 * 60 * 60),
            'user_id' => 1,
            'profile_id' => 1,
        ];

        $token = JWT::encode($payload, $secret, 'HS256');
        $this->info($token);
    }
}
```

No arquivo `Pest.php`, podemos criar uma função utilitária global para gerar um token JWT válido e reutilizá-lo em nossos testes.

Pest.php
```php
function generateJwtToken()
{
    Artisan::call('make:jwt', [
        '--user_id' => 1,
        '--profile_id' => 1,
        '--days' => 1
    ]);

    $token = Artisan::output();

    return $token;
}
```

### Usando Factories para Dados de Teste

As factories são um recurso bem bacana no Laravel para gerar instâncias de models com dados falsos. É bem útil para criar dados consistentes e repetíveis durante os testes.

Para criar uma factory, basta rodar o comando:

php artisan make:factory UserFactory --model=User

A factory gerada será armazenada no diretório `database/factories/UserFactory.php`.

Após a criação da factory, podemos definir os atributos do modelo usando a biblioteca Faker para gerar dados falsos para cada atributo.

UserFactory.php
```php
public function definition()
{
    return [
        'name' => $this->faker->name(),
        'email' => $this->faker->unique()->safeEmail(),
        'password' => 'password',
    ];
}
```

## Exemplos Práticos

### Feature Tests

Os Feature Tests são usados para testar fluxos, como criar um usuário. Esses testes devem ser escritos com base nas necessidades do usuário final e devem estar localizados no diretório `tests/Feature`. Ao testar uma API, é sempre recomendado iniciar com feature tests.

Exemplo GET `tests/Feature/API/v1/UserControllerTest.php`:

```php
use App\Models\User;

it('can get all users', function () {
    $token = generateJwtToken();
    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->get('/api/v1/users');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        '*' => [
            'id',
            'name',
            'email',
        ],
    ]);
});
```

Vamos analisar o teste acima:

1. Usando o método `it` do Pest para definir o nome do teste e a função de teste. (poderia ser `test` também)
2. Criamos um token JWT usando a função `generateJwtToken`.
3. A função de teste usa o método `get` para enviar uma solicitação GET para a rota `/api/v1/users`, passando o token no cabeçalho da requisição.
4. Usamos o método `assertStatus` para verificar se o status da resposta é 200.

Agora, vamos ver um exemplo de teste POST para criar um novo usuário:

Exemplo POST `tests/Feature/API/v1/UserControllerTest.php`:

```php
it('can create user', function () {
    $user = User::factory()->make();
    $token = generateJwtToken();

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->post('/api/v1/users', $user->toArray());

    $response->assertOk();
    $data = $response->json();
    $createdUser = User::find($data['id']);
    $this->assertModelExists($createdUser);
});
```

Vamos analisar o teste acima, passando pelas diferenças com o teste anterior:

1. Usamos o método `User::factory()->make()` para criar uma nova instância do modelo User com dados aleatórios.
2. Usamos o método `post` para enviar uma solicitação POST para a rota `/api/v1/users`, passando os dados do novo usuário e o token de autorização no cabeçalho da requisição.
3. Usamos o método `assertOk` para verificar se a resposta HTTP tem o status 200.
4. Usamos o método `assertModelExists` para verificar se o usuário foi criado no banco de dados.

Observe que por estarmos usando a classe `DatabaseTransactions`, o banco de dados é limpo após cada teste, garantindo que os testes sejam independentes e não afetem uns aos outros.

## Como Rodar os Testes?

No seu terminal, rode os comandos `./vendor/bin/pest` ou `php artisan test`.

Para rodar um arquivo de teste específico, use o comando `php artisan test --filter NomeArquivoTeste`.

Você também pode gerar um relatório de cobertura de código usando o comando `php artisan test --coverage --coverage-clover coverage.xml`.

## Conclusão

Tive uma experiência bem tranquila ao usar PHPUnit e Pest para testar APIs Laravel! Ambas as ferramentas são poderosas e fáceis de usar, e fornecem uma maneira eficaz de garantir que seu código funcione conforme o esperado.

## Referências

- [Documentação Testes Laravel](https://laravel.com/docs/9.x/testing#main-content)
- [Usando Model Factories no Laravel para testes](https://laravel.com/docs/9.x/eloquent-factories#main-content)
- [Documentação Pest](https://pestphp.com/docs/installation)
- [Documentação PHPUnit](https://docs.phpunit.de/en/9.6/)
