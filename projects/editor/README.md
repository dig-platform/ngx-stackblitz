NgxStackblitz
=============

Embed StackBlitz editor. See https://stackblitz.com/docs for more details.

```shell script
npm install @stackblitz/sdk ngx-stackblitz
```

Create New Project
------------------

```typescript
files = {
 'index.html': '<h1>My Test Page</h1>',
 'index.js': 'console.log("my test")'
}
```

```html
<ngx-stackblitz-editor 
    [files]="files" 
    title="My test project"
    description="Just a test"
    template="javascript"
    (changed)="saveTree($event)"></ngx-stackblitz-editor>
```


### Editor API

| Name | Description |
| ---- | ----------- |
| ` @Input() files: {[path: string]: string};` | List of files to add to the project |
| `@Input() title: string;` | Project title |
| `@Input() description: string;` | Project description |
| `@Input() template: 'angular-cli' / 'create-react-app' / 'typescript' / 'javascript';` | Type of project to create |
| `@Input() tags?: string[];` | Project tags |
| `@Input() dependencies?: {[name: string]: string};` | NPM dependencies |
| `@Input() settings?: any;` | Stackblitz Settings |
| `@Input() openFile: string;` | Path to file that should open initially |
| `@Input() view: string;` | (preview / editor) editor view |
| `@Input() height: string;` | Editor height, defaults to 100% |
| `@Input() width: string;` | Editor width, defaults to 100% |
| `@Input() hideExplorer: boolean;` | Hide the file explorer, defaults to false |
| `@Input() hideNavigation: boolean;` | Hide the editor nav, defaults to false |
| `@Input() fileReadInterval: number;` | Interval (milliseconds) to poll editor for changes, defaults to every second |
| `@Output() changed: EventEmitter<EditorChangeEvent>` | emitted every time the tree changes |
| `@Output() loaded: EventEmitter<EditorFile[]>` | emitted when the tree is loaded |
| `@Output() created: EventEmitter<EditorFile>` | emitted when a file is created |
| `@Output() updated: EventEmitter<EditorFile>` | emitted when a file is updated |
| `@Output() deleted: EventEmitter<EditorFile>` | emitted when a file is deleted |

### REQUIRED FILES FOR TEMPLATES

| Template | Files |
| -------- | ----- |
| angular-cli | Requires index.html and main.ts to be present |
| create-react-app | Requires index.html and index.js to be present |
| typescript | Requires index.html and index.ts to be present |
| javascript | Requires index.html and index.js to be present |

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
| `@Output() loaded: EventEmitter<EditorFile[]>` | emitted when the tree is loaded |
| `@Output() created: EventEmitter<EditorFile>` | emitted when a file is created |
| `@Output() updated: EventEmitter<EditorFile>` | emitted when a file is updated |
| `@Output() deleted: EventEmitter<EditorFile>` | emitted when a file is deleted |

Embed Existing Project
-------------------

```html
<ngx-stackblitz-editor 
    projectID="my-project" 
    (changed)="saveTree($event)"></ngx-stackblitz-editor>
```


Open existing project

| Name | Description |
| ---- | ----------- |
| ` @Input() projectID: string;` | Stackblitz project ID |
| `@Input() openFile: string;` | Path to file that should open initially |
| `@Input() view: string;` | (preview / editor) editor view |
| `@Input() height: string;` | Editor height, defaults to 100% |
| `@Input() width: string;` | Editor width, defaults to 100% |
| `@Input() hideExplorer: boolean;` | Hide the file explorer, defaults to false |
| `@Input() hideNavigation: boolean;` | Hide the editor nav, defaults to false |
| `@Input() fileReadInterval: number;` | Interval (milliseconds) to poll editor for changes, defaults to every second |
| `@Output() changed: EventEmitter<EditorChangeEvent>` | emitted every time the tree changes |
| `@Output() loaded: EventEmitter<EditorFile[]>` | emitted when the tree is loaded |
| `@Output() created: EventEmitter<EditorFile>` | emitted when a file is created |
| `@Output() updated: EventEmitter<EditorFile>` | emitted when a file is updated |
| `@Output() deleted: EventEmitter<EditorFile>` | emitted when a file is deleted |

Interfaces
----------

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

