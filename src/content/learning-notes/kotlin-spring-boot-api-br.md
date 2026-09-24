---
title: "Kotlin com Spring Boot para APIs"
publishedAt: 2025-11-22
description: "A interoperabilidade do Kotlin com Java e Spring Boot resulta em código de API REST conciso e moderno."
lang: "br"
tags: ["kotlin","spring-boot"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/kotlin-with-spring-boot-for-api-usage.md"
editorialState: "published-here"
visibility: "public"
---

Kotlin é uma linguagem de programação moderna, com tipagem estática, que roda na JVM e é totalmente interoperável com Java. Combinada com o Spring Boot, ela oferece um jeito poderoso e conciso de construir APIs REST.

## Por que Kotlin para APIs?

- **Concisão**: menos código boilerplate comparado ao Java
- **Null safety**: a segurança contra nulos embutida reduz NullPointerExceptions
- **Coroutines**: suporte nativo a programação assíncrona
- **Interoperabilidade**: dá pra usar bibliotecas Java existentes sem atrito
- **Sintaxe moderna**: data classes, extension functions e mais

## Configurando Spring Boot + Kotlin

### Dependências

```kotlin
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
}
```

### Classe da aplicação

```kotlin
@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
```

## Principais recursos do Kotlin no Spring Boot

### Data Classes

Perfeitas para DTOs e entidades:

```kotlin
@Entity
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val name: String,
    val email: String,
    val createdAt: LocalDateTime = LocalDateTime.now()
)
```

### Null Safety

A null safety do Kotlin funciona muito bem com os valores opcionais do Spring:

```kotlin
@GetMapping("/users/{id}")
fun getUser(@PathVariable id: Long): ResponseEntity<User> {
    val user = userRepository.findById(id)
    return if (user != null) {
        ResponseEntity.ok(user)
    } else {
        ResponseEntity.notFound().build()
    }
}
```

### Extension Functions

Adicione funções utilitárias a classes existentes:

```kotlin
fun String.isValidEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

// Usage
if (email.isValidEmail()) {
    // ...
}
```

### Coroutines para operações assíncronas

As coroutines do Kotlin são uma alternativa mais limpa ao CompletableFuture:

```kotlin
@GetMapping("/users")
suspend fun getUsers(): List<User> {
    return userRepository.findAll()
}
```

## Exemplo de REST Controller

```kotlin
@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {
    @GetMapping
    fun getAllUsers(): List<UserDTO> {
        return userService.findAll()
    }
    
    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long): ResponseEntity<UserDTO> {
        return userService.findById(id)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }
    
    @PostMapping
    fun createUser(@RequestBody @Valid userDTO: UserDTO): ResponseEntity<UserDTO> {
        val created = userService.create(userDTO)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }
    
    @PutMapping("/{id}")
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody @Valid userDTO: UserDTO
    ): ResponseEntity<UserDTO> {
        return userService.update(id, userDTO)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }
    
    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: Long): ResponseEntity<Void> {
        return if (userService.delete(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
```

## Padrão Repository

```kotlin
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun existsByEmail(email: String): Boolean
}
```

## Camada de serviço

```kotlin
@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun findAll(): List<UserDTO> {
        return userRepository.findAll().map { it.toDTO() }
    }
    
    fun findById(id: Long): UserDTO? {
        return userRepository.findById(id)
            .map { it.toDTO() }
            .orElse(null)
    }
    
    fun create(userDTO: UserDTO): UserDTO {
        val user = userDTO.toEntity()
        return userRepository.save(user).toDTO()
    }
    
    fun update(id: Long, userDTO: UserDTO): UserDTO? {
        return userRepository.findById(id)
            .map { existing ->
                val updated = existing.copy(
                    name = userDTO.name,
                    email = userDTO.email
                )
                userRepository.save(updated).toDTO()
            }
            .orElse(null)
    }
    
    fun delete(id: Long): Boolean {
        return if (userRepository.existsById(id)) {
            userRepository.deleteById(id)
            true
        } else {
            false
        }
    }
}
```

## Tratamento de erros

```kotlin
@ControllerAdvice
class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException::class)
    fun handleNotFound(ex: EntityNotFoundException): ResponseEntity<ErrorResponse> {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse(ex.message ?: "Resource not found"))
    }
    
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidation(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        val errors = ex.bindingResult.fieldErrors
            .associate { it.field to (it.defaultMessage ?: "") }
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse("Validation failed", errors))
    }
}
```

## Vantagens em relação ao Java

1. **Menos boilerplate**: data classes eliminam getters/setters/construtores
2. **Código mais seguro**: a null safety evita muitos erros em tempo de execução
3. **Mais expressivo**: extension functions e funções de ordem superior
4. **Assíncrono melhor**: coroutines são mais intuitivas que CompletableFuture
5. **Interoperável**: ainda dá pra usar bibliotecas e frameworks Java

Links:

- [Kotlin Official Documentation](https://kotlinlang.org/docs/home.html)
- [Spring Boot with Kotlin Guide](https://spring.io/guides/tutorials/spring-boot-kotlin/)
- [Kotlin Coroutines Guide](https://kotlinlang.org/docs/coroutines-guide.html)

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/kotlin-with-spring-boot-for-api-usage.md).
