---
title: "JSON backup and export patterns for task management"
publishedAt: 2026-02-16
description: "Implementing JSON-based backup functionality for user data export/import while working on the Tarefitas app."
lang: "en"
tags: ["data-patterns"]
editorialState: "published-here"
visibility: "public"
---

Working on the Tarefitas app, I implemented JSON-based backup functionality for user data export/import.

## BackupService implementation

Create a service to handle data serialization:

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

## UI integration

Add export/import buttons in settings:

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

## Backup format structure

Use a versioned, extensible format:

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

## Reset functionality

Provide data reset with confirmation:

```typescript
const resetData = async () => {
  if (confirm('This will delete all your data. Are you sure?')) {
    await backupService.clearAllData();
    window.location.reload(); // Fresh start
  }
};
```

This pattern works well for any app that needs user data portability.
