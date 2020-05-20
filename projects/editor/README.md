NgxStackblitz
=============

Embed StackBlitz editor

```shell script
npm install @stackblitz/sdk ngx-stackblitz
```

Embed GithubProject
-------------------

```html
<ngx-stackblitz-editor 
    repo="dig-platform/plugin-template" 
    (changed)="saveTree($event)"></ngx-stackblitz-editor>
```


### Editor API

| Name | Description |
| ---- | ----------- |
| ` @Input() repo: string;` | github repo path ie: dig-hub/my-plugin |
| `@Input() openFile: string;` | Path to file that should open initially |
| `@Input() view: string;` | (preview / editor) editor view |
| `@Input() height: string;` | Editor height, defaults to 100% |
| `@Input() width: string;` | Editor width, defaults to 100% |
| `@Input() hideExplorer: boolean;` | Hide the file explorer, defaults to false |
| `@Input() hideNavigation: boolean;` | Hide the editor nav, defaults to false |
| `@Input() fileReadInterval: number;` | Interval (milliseconds) to poll editor for changes, defaults to every second |
| `@Output() changed: EventEmitter<EditorChangeEvent>` | emitted every time the tree changes |
| `@Output() loaded: EventEmitter<EditorChangeEvent>` | emitted when the tree is loaded |
| `@Output() created: EventEmitter<EditorFile>` | emitted when a file is created |
| `@Output() updated: EventEmitter<EditorFile>` | emitted when a file is updated |
| `@Output() deleted: EventEmitter<EditorFile>` | emitted when a file is deleted |


### Interfaces

```typescript
export interface EditorFile {
  path: string;
  content: string;
  status?: string;
}
```

```typescript
export interface EditorChangeEvent {
  tree: EditorFile[];
  created?: EditorFile[];
  updated?: EditorFile[];
  deleted?: EditorFile[];
}
```

Embed New Project
-----------------

Coming soon...
