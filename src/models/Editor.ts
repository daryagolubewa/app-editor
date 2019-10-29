import Release from './Release'
import ReleaseWindow from './ReleaseWindow'
import ReleaseChange from './ReleaseChange'
import ReleaseChangeWindow from "./ReleaseChangeWindow";
import { observable, action } from 'mobx'
import { TMode } from './ReleaseWindow'
import { TChangeMode } from "./ReleaseChangeWindow";

export default class Editor {

    @observable selectedRelease: Release | undefined;
    @observable selectedChange: ReleaseChange | undefined;
    @observable clonedSelectedRelease: Release | undefined;
    @observable releases: Release[] = [];
    @observable releaseWindow: ReleaseWindow;
    @observable releaseChangeWindow: ReleaseChangeWindow;
    @observable changes: ReleaseChange[] = [];

    constructor() {
        this.releaseWindow = new ReleaseWindow({
            onSubmit: this.onReleaseWindowSubmit
        });
        this.releaseChangeWindow = new ReleaseChangeWindow({
            onSubmit: this.onReleaseChangeWindowSubmit
        })
    }

    @action newRelease() {
        this.releaseWindow.show('insert', new Release());
    }

    private onReleaseWindowSubmit = (release: Release, mode: TMode) => {
        switch (mode) {
            case 'insert':
                this.releases.push(release);
                break;
            case 'update':
                break;
        }
    };

    @action changeRelease() {
        if(this.selectedRelease !== undefined) {
            this.releaseWindow.show('update', this.selectedRelease)
        }
    }

    @action deleteRelease() {
        this.releases = this.releases.filter(release => release !== this.selectedRelease);
        this.selectedRelease = undefined;
    }

    @action newReleaseChange() {
            this.releaseChangeWindow.show('create', new ReleaseChange())
    }

    private onReleaseChangeWindowSubmit = (releaseChange: ReleaseChange, mode: TChangeMode) => {
        switch (mode) {
            case 'create':
                this.changes.push(releaseChange);
                break;
            case 'update':
                break;
        }
    }

}
