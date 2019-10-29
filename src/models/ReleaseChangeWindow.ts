import {action, observable} from 'mobx';
import ReleaseChange from "./ReleaseChange";
import Release from "./Release";

export type TChangeMode = 'create' | 'update';

type TOnSubmitHandler = (release: ReleaseChange, mode: TChangeMode) => void;

interface IReleaseWindowParams {
    onSubmit: TOnSubmitHandler;
}

export default class ReleaseChangeWindow {

    /**
     * Содержит экземляр класса Release (запись). Его поля используются в форме, все изменения в полях формы переносятся в эту запись.
     */
    @observable releaseChange: ReleaseChange | undefined;

    /**
     * Режим работы окна.
     */
    @observable mode: TChangeMode | undefined;

    /**
     * Режим видимости окна.
     */
    @observable visible: boolean = false;

    /**
     * Место хранения обработчика события Submit, которое передано со стороны пользователя.
     */
    private onSubmit: TOnSubmitHandler;

    /**
     * Конструктор.
     * Сохранение обработчика события Submit.
     */
    constructor(params: IReleaseWindowParams) {
        this.onSubmit = params.onSubmit;
    }

    /**
     * Действие: открыть окно. При запуске действия передаются режим окна и текущая запись.
     */
    @action show(mode: TChangeMode, releaseChange: ReleaseChange) {
        this.mode = mode;
        this.releaseChange = releaseChange;
        this.visible = true;
    }

    /**
     * Действие: завершение ввода данных в поля окна.
     */
    @action submit() {
        if (this.releaseChange && this.mode) {
            this.onSubmit(this.releaseChange, this.mode);
        }
    }

    /**
     * Действие: скрыть окно.
     */
    @action hide() {
        this.visible = false;
    }
}