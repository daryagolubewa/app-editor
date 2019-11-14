import Modal from "@material-ui/core/Modal";
import React, {Fragment, Component} from "react";
import Panel from "../Panel";
import {FormControl, Input, InputLabel, OutlinedInput} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import {inject, Provider, observer} from "mobx-react";
import Editor from "../../models/Editor";
import './ModalReleaseWindowStyle.scss'

interface IModalReleaseWindowProps {
    editor?: Editor;
}

@inject('editor')
@observer
export default class ModalReleaseWindow extends Component<IModalReleaseWindowProps> {

    render() {
        if (!this.props.editor) {
            throw Error('Ожидается ссылка на модель Editor');
        }

        const releaseWindow = this.props.editor.releaseWindow;

        return (
            <Modal open={releaseWindow.visible} onClose={() => releaseWindow.hide()}  aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description">
                <Fragment>
                    <div className='main-container'>
                        <div className='modal-container'>
                            <Panel  title={releaseWindow.mode === 'insert' ? 'Редактор релиза' : 'Редактор релиза'} flex={1}>
                                <form>
                                    <div className='modal-element'>
                                        <FormControl fullWidth>
                                            <InputLabel> Версия клиента</InputLabel>
                                            <Input value={releaseWindow.record ? releaseWindow.record.clientVersion : ''}/>
                                        </FormControl>
                                    </div>
                                    <div className='modal-element'>
                                        <FormControl fullWidth>
                                            <InputLabel > Версия сервера </InputLabel>
                                            <Input value={releaseWindow.record ? releaseWindow.record.serverVersion : ''}/>
                                        </FormControl>
                                    </div>
                                    <div className='modal-element' >
                                        <FormControl fullWidth>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    label='Дата выхода релиза'
                                                    value={releaseWindow.record ? releaseWindow.record.releaseDate : new Date()}
                                                    onChange={() => {
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </FormControl>
                                    </div>
                                    <div className='modal-element'>
                                        <Button variant="outlined" style={{marginRight: 10}}>Отменить</Button>
                                        <Button variant="outlined">Сохранить</Button>
                                    </div>
                                </form>
                            </Panel>
                        </div>

                    </div>
                </Fragment>
            </Modal>
        )
    }
}