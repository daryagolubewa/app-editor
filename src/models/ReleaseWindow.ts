import {action, observable} from 'mobx';
import Release from './Release';

export type TMode = 'insert' | 'update';

type TOnSubmitHandler = (release: Release, mode: TMode) => void;

interface IReleaseWindowParams {
    onSubmit: TOnSubmitHandler;
}

export default class ReleaseWindow {
    @observable release: Release | undefined;

    @observable mode: TMode | undefined;

    @observable visible: boolean = false;

    private onSubmit: TOnSubmitHandler;

    constructor(params: IReleaseWindowParams) {
        this.onSubmit = params.onSubmit;
    }

    @action show(mode: TMode, release: Release) {
        this.mode = mode;
        this.release = release;
        this.visible = true;
    }

    @action submit() {
        if (this.release && this.mode) {
            this.onSubmit(this.release, this.mode);
        }
    }

    @action hide() {
        this.visible = false;
    }
}