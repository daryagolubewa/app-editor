import React, {Component, MouseEvent} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {inject, observer } from "mobx-react";
import Editor from "../models/Editor";

interface IReleaseChangeTableProps {
    editor?: Editor;
}

@inject('editor')
@observer
export default class ReleaseChangeTable extends Component<IReleaseChangeTableProps> {

    render() {

        if (!this.props.editor) {
            throw Error('Ожидается ссылка на модель Editor');
        }

        const selectedRelease = this.props.editor.selectedRelease;
        let releaseChangesHasData = selectedRelease !== undefined && selectedRelease.releaseChanges.length > 0;


        return (

            releaseChangesHasData ? <Paper>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Тип изменения</TableCell>
                                <TableCell>Номер Jira</TableCell>
                                <TableCell>Описание</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedRelease && selectedRelease.releaseChanges.map((release, index) => {

                                if (!this.props.editor) {
                                    return null;
                                }
                                if (!selectedRelease) {
                                    return null;
                                }

                                let tableRowBackgroundColor = (
                                    this.props.editor.selectedChange
                                        ? selectedRelease.releaseChanges.indexOf(this.props.editor.selectedChange) === index ? '#77a8ed' : undefined
                                        : undefined
                                );

                                return (<TableRow key={index} hover onClick={this.onTableRowClick} data-index={index}
                                                  style={{background: tableRowBackgroundColor}}>
                                    <TableCell>{release.type}</TableCell>
                                    <TableCell>{release.jiraNumber}</TableCell>
                                    <TableCell>{release.description}</TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                : <p style={{margin: 'auto', fontStyle: "italic"}}> Нет данных для отображения </p>

        );
    }
    private onTableRowClick = (event: MouseEvent<HTMLTableRowElement>) => {
        const selectediIndex = event.currentTarget.getAttribute('data-index');
        if(!this.props.editor) {
            throw Error('Ожидается ссылка на модель Editor');
        }

        if(!this.props.editor.selectedRelease) {
            throw Error('Ожидается ссылка на массив selectedRelease модели Editor');
        }

        this.props.editor.selectedChange = this.props.editor.selectedRelease.releaseChanges.find((release, index) => index === Number(selectediIndex))
    }
}