---
title: "Padrões de backup e exportação em JSON para gerenciamento de tarefas"
publishedAt: 2026-02-16
description: "Implementando backup em JSON para exportar/importar dados do usuário enquanto trabalhava no app Tarefitas."
lang: "br"
tags: ["data-patterns"]
editorialState: "published-here"
visibility: "public"
---

Trabalhando no app Tarefitas, implementei uma funcionalidade de backup em JSON para exportar/importar os dados do usuário.

## Implementação do BackupService

Crie um serviço para cuidar da serialização dos dados:

```typescript
class BackupService {
  async exportData(): Promise<string> {
    const tasks = await this.taskStore.getAllTasks();
    const settings = await this.settingsStore.getAll();

    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: {
        tasks,
        settings,
        subtasks: await this.getSubtasksForTasks(tasks)
      }
    };

    return JSON.stringify(backup, null, 2);
  }

  async importData(jsonString: string): Promise<void> {
    const backup = JSON.parse(jsonString);

    // Validate backup format
    if (!backup.version || !backup.data) {
      throw new Error('Invalid backup format');
    }

    // Import with transaction-like behavior
    await this.clearExistingData();
    await this.taskStore.bulkCreate(backup.data.tasks);
    await this.settingsStore.bulkUpdate(backup.data.settings);
  }
}
```

## Integração com a interface

Adicione botões de exportar/importar nas configurações:

```typescript
const DataSection = () => {
  const backupService = new BackupService();

  const handleExport = async () => {
    try {
      const data = await backupService.exportData();
      // Trigger file download
      downloadFile(`tarefitas-backup-${Date.now()}.json`, data);
    } catch (error) {
      showError('Export failed');
    }
  };

  const handleImport = async (file: File) => {
    const text = await file.text();
    await backupService.importData(text);
    showSuccess('Data imported successfully');
  };
}
```

## Estrutura do formato de backup

Use um formato versionado e extensível:

```json
{
  "version": "1.0",
  "timestamp": "2026-02-16T15:30:00Z",
  "data": {
    "tasks": [...],
    "settings": {...},
    "subtasks": [...],
    "metadata": {
      "totalTasks": 42,
      "appVersion": "2.1.0"
    }
  }
}
```

## Funcionalidade de reset

Ofereça um reset dos dados com confirmação:

```typescript
const resetData = async () => {
  if (confirm('This will delete all your data. Are you sure?')) {
    await backupService.clearAllData();
    window.location.reload(); // Fresh start
  }
};
```

Esse padrão funciona bem para qualquer app que precise de portabilidade dos dados do usuário.
