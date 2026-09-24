---
title: "Verificando a permissão de notificações no SwiftUI"
publishedAt: 2025-07-24
description: "Criando uma classe Notification para verificar e pedir a permissão de notificações do usuário."
lang: "br"
tags: ["swiftui","ios"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/swift-ui-check-authorization-notifications.md"
editorialState: "published-here"
visibility: "public"
---

Podemos criar uma nova classe chamada Notification e, dentro dela, uma função estática chamada checkAuthorization. Essa função é responsável por pegar a central de notificações do usuário e verificar o status: se está autorizado ou não, ou se precisamos pedir a permissão porque ainda não foi definida.

```swift
class PomodoroNotification {
    
    static func checkAuthorization(completion: @escaping(Bool) -> Void){
        let notificationCenter = UNUserNotificationCenter.current()
        notificationCenter.getNotificationSettings{settings in
            switch settings.authorizationStatus {
                case .authorized:
                    completion(true)
                case .notDetermined:
                notificationCenter.requestAuthorization(options: [.alert, .badge, .sound], completionHandler: {allowed, error in completion(allowed)})
                    
                default:
                    completion(false)
            }
        }
    }
```


Depois, na nossa view, usamos o evento de mudança do ambiente scenePhase para chamar o nosso método de verificar a autorização


```swift

import SwiftUI

struct Notificationdemo: View {
    @State private var showWarning = false
    @Environment(\.scenePhase) var scenePhase
    var body: some View {
        VStack{
            Button("send not") {
                PomodoroNotification.scheduleNotification(seconds: 5, title: "Title", body: "Body")
            }
            
            if showWarning {
                VStack {
                    Text("Notifications are disabled")
                    Button("Enable"){
                        
                    }
                }
            }
        }
        .onChange(of: scenePhase) {
            if(scenePhase == .active){
                PomodoroNotification.checkAuthorization {
                        authorized in showWarning = !authorized
                    }
                }
            }
        }
}

#Preview {
    Notificationdemo()
}
```

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/swift-ui-check-authorization-notifications.md).
