import {action, observable} from 'mobx';
import Release from './Release';

/**
 * TMode - режим работы окна (создание или редактирование)
 */
export type TMode = 'insert' | 'update';

/**
 * Обработчик события submit у окна. Submit возникает при нажатии кнопки "Сохранить" в Виде.
 */
type TOnSubmitHandler = (release: Release, mode: TMode) => void;

/**
 * Параметры конструктора класса ReleaseWindow.
 */
interface IReleaseWindowParams {
    onSubmit: TOnSubmitHandler;
}

/**
 * ReleaseWindow - модель окна, которая используется для создания записи и редактирования записи.
 * Это окно создается один раз при запуске программы и в течение работы программы скрывается, либо показывается по необходимости.
 */
export default class ReleaseWindow {

    /**
     * Содержит экземляр класса Release (запись). Его поля используются в форме, все изменения в полях формы переносятся в эту запись.
     */
    @observable release: Release | undefined;

    /**
     * Режим работы окна.
     */
    @observable mode: TMode | undefined;

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
    @action show(mode: TMode, release: Release) {
        this.mode = mode;
        this.release = release;
        this.visible = true;
    }

    /**
     * Действие: завершение ввода данных в поля окна.
     */
    @action submit() {
        if (this.release && this.mode) {
            this.onSubmit(this.release, this.mode);
        }
    }

    /**
     * Действие: скрыть окно.
     */
    @action hide() {
        this.visible = false;
    }
}