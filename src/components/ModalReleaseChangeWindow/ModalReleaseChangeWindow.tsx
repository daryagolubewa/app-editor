import React, {Component, Fragment, ReactNode} from 'react';
import Modal from "@material-ui/core/Modal";
import Panel from "../Panel";
import {FormControl, Input, InputLabel, OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {inject, observer, Provider} from "mobx-react";
import Editor from "../../models/Editor";
import './ModalReleaseChangeWindowStyle.scss'

interface IModalReleaseChangeWindowProps {
    editor?: Editor;
}

@inject('editor')
@observer
export default class ModalReleaseChangeWindow extends Component<IModalReleaseChangeWindowProps> {
	public render(): ReactNode {

        if (!this.props.editor) {
            throw Error('Ожидается ссылка на модель Editor');
        }

        const releaseChangeWindow = this.props.editor.releaseChangeWindow;

		return (
            <Modal open={releaseChangeWindow.visible} onClose={ () => releaseChangeWindow.hide()}
                   aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Fragment>
                    <div className='main-container'>
                        <div className='modal-container'>
                            <Panel  title={releaseChangeWindow.mode === 'insert' ? 'Редактор изменения' : 'Редактор изменения'} flex={1}>
                                <form>
                                    <div className='modal-element'>
                                        <FormControl fullWidth>
                                            <InputLabel> Тип изменения</InputLabel>
                                            <Input value={releaseChangeWindow.record ? releaseChangeWindow.record.type : ''} />
                                        </FormControl>
                                    </div>
                                    <div className='modal-element'>
                                        <FormControl fullWidth>
                                            <InputLabel > Номер Jira </InputLabel>
                                            <Input  value={releaseChangeWindow.record ? releaseChangeWindow.record.jiraNumber : ''}/>
                                        </FormControl>
                                    </div>
                                    <div className='modal-element' >
                                        <FormControl fullWidth>
                                            <InputLabel> Описание </InputLabel>
                                            <Input value={releaseChangeWindow.record ? releaseChangeWindow.record.description : '' } />
                                        </FormControl>
                                    </div>
                                    <div className='modal-element'>
                                        <Button variant="outlined" style={{marginRight: 10}}>Отменить</Button>
                                        <Button variant="outlined" >Сохранить</Button>
                                    </div>
                                </form>
                            </Panel>
                        </div>

                    </div>
                </Fragment>
            </Modal>

        );
	}
}