---
title: "Testing JWT Authenticated APIs with PHPUnit and Pest in Laravel"
publishedAt: 2024-04-16
description: "How to test your Laravel APIs with PHPUnit and Pest, using Factory, Traits, and custom commands"
isPublish: false
lang: "en"
tags: ["php", "laravel", "testing", "phpunit", "pest", "jwt", "api", "authentication", "tutorial"]
---

# Testing APIs with PHPUnit and Pest in Laravel

Recently, I needed to implement API tests in Laravel with PHPUnit and Pest, and I found it interesting to share a bit about it for future reference.

PHPUnit is a unit testing tool for the PHP programming language that provides a framework for writing unit tests. Pest is an alternative to PHPUnit, built on top of it but with a slightly simpler syntax.

## Configuring PHPUnit and Pest

Check Pest's official documentation for more details on installation and configuration.

[https://pestphp.com/docs/installation](https://pestphp.com/docs/installation)

After installation, we can start writing tests for our Laravel APIs in the `tests/Feature` folder.

### Test Case Configuration

In PHPUnit, test cases are typically classes that extend `PHPUnit\Framework\TestCase`. Using Pest, a `Pest.php` file is created at the root of the `/tests` folder, which is used for global configurations or utility functions that can be used in all tests.

In this file, for example, we use Laravel's base test class, `Tests\TestCase`, which already has common setup and teardown methods, configurations, or utility methods used in your tests.

Pest.php
```php
uses(
    Tests\TestCase::class,  
    Illuminate\Foundation\Testing\DatabaseTransactions::class,
)->in('Feature');
```

- `Tests\TestCase::class`: This is your base test case class, which may include common setup and teardown methods, configurations, or utility methods used in your tests.
- `DatabaseTransactions::class`: This class ensures that each test is run within a database transaction, which is rolled back at the end of the test, ensuring a clean state for the next test.

### Generating a JWT Token for Authentication

Many APIs use the JWT (JSON Web Token) authentication strategy to protect routes. During testing, we can create a utility function to generate a valid JWT token for authentication, and then reuse it as needed.

To do this, we can create a custom Artisan Command to generate a JWT token based on specific parameters, such as user ID, profile ID, etc.

```bash
php artisan make:command GenerateJwtToken
```

GenerateJwtToken.php
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

In the `Pest.php` file, we can create a global utility function to generate a valid JWT token and reuse it in our tests.

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

### Using Factories for Test Data

Factories are a very nice feature in Laravel for generating model instances with fake data. It is very useful for creating consistent and repeatable data during tests.

To create a factory, simply run the command:

`php artisan make:factory UserFactory --model=User`

The generated factory will be stored in the `database/factories/UserFactory.php` directory.

After creating the factory, we can define the model attributes using the Faker library to generate fake data for each attribute.

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

## Practical Examples

### Feature Tests

Feature Tests are used to test flows, such as creating a user. These tests should be written based on the user's needs and should be located in the `tests/Feature` directory. When testing an API, it is always recommended to start with feature tests.

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

Let's analyze a typical test:

1. Using Pest's `it` method to define the test name and test function. (it could also be `test`)
2. We create a JWT token using the `generateJwtToken` function.
3. The test function uses the `get` method to send a GET request to the `/api/v1/users` route, passing the token in the request header.
4. We use the `assertStatus` method to verify that the response status is 200.

For a POST test to create a new user, the process involves:

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

1. Using the `User::factory()->make()` method to create a new instance of the User model with random data.
2. Using the `post` method to send a POST request to the `/api/v1/users` route, passing the new user's data and the authorization token in the request header.
3. Using the `assertOk` method to verify that the HTTP response status is 200.
4. Using the `assertModelExists` method to verify that the user was created in the database.

Note that since we are using the `DatabaseTransactions` class, the database is cleaned up after each test, ensuring that tests are independent and do not affect each other.

## How to Run the Tests?

In your terminal, run the commands `./vendor/bin/pest` or `php artisan test`.

To run a specific test file, use the command `php artisan test --filter TestFileName`.

You can also generate a code coverage report using the command `php artisan test --coverage --coverage-clover coverage.xml`.

## Conclusion

I had a very smooth experience using PHPUnit and Pest to test Laravel APIs! Both tools are powerful and easy to use, providing an effective way to ensure your code works as expected.

## References

- [Laravel Testing Documentation](https://laravel.com/docs/9.x/testing#main-content)
- [Using Laravel Model Factories for Testing](https://laravel.com/docs/9.x/eloquent-factories#main-content)
- [Pest Documentation](https://pestphp.com/docs/installation)
- [PHPUnit Documentation](https://docs.phpunit.de/en/9.6/)
