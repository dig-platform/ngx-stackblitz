import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import stackblitz from '@stackblitz/sdk';

export interface EditorFile {
  path: string;
  content: string;
  status?: string;
}

export interface EditorChangeEvent {
  tree: EditorFile[];
  created?: EditorFile[];
  updated?: EditorFile[];
  deleted?: EditorFile[];
}

@Component({
  selector: 'ngx-stackblitz-editor',
  template: `<div #editor></div>`,
  styles: [`:host{ width: 100%; height: 100%; display: block;}`]
})
export class EditorComponent implements AfterViewInit, OnDestroy {

  @ViewChild('editor') editor: ElementRef;

  @Input() projectID: string; // existing project id
  @Input() files: {[path: string]: string}; // List of files to add to the project
  @Input() title: string; // Project title
  @Input() description: string; // Project description
  @Input() template: 'angular-cli' | 'create-react-app' | 'typescript' | 'javascript'; // Type of project to create
  @Input() tags: string[]; // github repo path ie: dig-hub/my-plugin
  @Input() dependencies?: {[name: string]: string}; // NPM dependencies
  @Input() settings: any; // Stackblitz Settings
  @Input() repo: string; // github repo path ie: dig-hub/my-plugin
  @Input() openFile: string; // Show a specific file on embed load
  @Input() view: string; // preview | editor
  @Input() height = '100%';
  @Input() width = '100%';
  @Input() hideExplorer: boolean;
  @Input() hideNavigation: boolean;
  @Input() forceEmbed: boolean;
  @Input() fileReadInterval = 1000; // poll the editor's VM for changes every n milliseconds

  // emitted every time the tree changes
  @Output() changed: EventEmitter<EditorChangeEvent> = new EventEmitter<EditorChangeEvent>();

  // emitted when a the editor has loaded the file tree
  @Output() loaded: EventEmitter<EditorChangeEvent> = new EventEmitter<EditorChangeEvent>();

  // emitted when a file is created
  @Output() created: EventEmitter<EditorFile> = new EventEmitter<EditorFile>();

  // emitted when a file is updated
  @Output() updated: EventEmitter<EditorFile> = new EventEmitter<EditorFile>();

  // emitted when a file is deleted
  @Output() deleted: EventEmitter<EditorFile> = new EventEmitter<EditorFile>();


  // editor instance vm
  private vm: any;

  // editor fileTree
  private fileTree: EditorFile[];

  private fileInterval: any;

  private isLoaded: boolean;

  get options() {
    const {openFile, view, height, width, hideExplorer, hideNavigation, forceEmbed} = this;
    return {openFile, view, height, width, hideExplorer, hideNavigation, forceEmbed};
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.loadEditor();
  }

  loadEditor() {
    if (this.repo) {
      stackblitz.embedGithubProject(this.editor.nativeElement,  this.repo, this.options).then(vm => {
        this.vm = vm;
        this.watchFiles();
      }, console.error);
    } else if (this.projectID) {
      stackblitz.embedProjectId(this.editor.nativeElement, this.projectID, this.options).then(vm => {
        this.vm = vm;
        this.watchFiles();
      }, console.error);
    } else {
      const {files, title, description, template, tags, dependencies, settings} = this;
      const project = {files, title, description, template, tags, dependencies, settings};
      console.log(files);
      stackblitz.embedProject(this.editor.nativeElement, project, this.options).then(vm => {
        this.vm = vm;
        this.watchFiles();
      }, console.error);
    }
  }

  watchFiles() {
    this.fileInterval = setInterval(() => this.loadFiles(), this.fileReadInterval);
  }

  loadFiles() {
    if (! this.vm) {
      return false;
    }
    this.vm.getFsSnapshot().then(fileTree => {
      const fileArray = Object.keys(fileTree).map(path => {
        return {
          path,
          content: fileTree[path]
        };
      });

      if (! this.fileTree) {
        this.fileTree = fileArray;
        return;
      }

      const changedFiles = fileArray.filter((file: EditorFile) => {
        const current = this.fileTree.find(f => f.path === file.path);
        return current && current.content !== file.content;
      });

      if (changedFiles) {
        changedFiles.forEach(file => this.updated.emit(file));
      }

      const newFiles = fileArray.filter((file: EditorFile) => {
        return ! this.fileTree.find(f => f.path === file.path);
      });

      if (newFiles) {
        newFiles.forEach(file => this.created.emit(file));
      }

      const deletedFiles = this.fileTree.filter((file: EditorFile) => {
        return ! fileArray.find(f => f.path === file.path);
      });

      if (deletedFiles) {
        deletedFiles.forEach(file => this.deleted.emit(file));
      }

      if (changedFiles.length > 0 || newFiles.length > 0 || deletedFiles.length > 0) {
        this.changed.emit({
          tree: fileArray,
          created: newFiles,
          updated: changedFiles,
          deleted: deletedFiles
        });
      }

      this.fileTree = fileArray;

      if (! this.isLoaded) {
        this.loaded.emit({tree: fileArray});
        this.isLoaded = true;
      }
    }, console.error);
  }

  ngOnDestroy(): void {
    this.fileInterval.clearInterval();
  }

}
