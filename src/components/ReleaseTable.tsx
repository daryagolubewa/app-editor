import React, {Component, MouseEvent} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {inject, observer } from "mobx-react";
import Editor from "../models/Editor";

interface IReleaseTableProps {
    editor?: Editor;
}

@inject('editor')
@observer
export default class ReleaseTable extends Component<IReleaseTableProps> {

    render() {
        if(!this.props.editor) {
            throw Error('Ожидается ссылка на модель Editor');
        }

        return (
            <Paper >
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Версия клиента</TableCell>
                            <TableCell>Версия сервера</TableCell>
                            <TableCell>Дата релиза</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.editor.releases.map((release, index) => {
                            if(!this.props.editor) {
                                throw Error('Ожидается ссылка на модель Editor');
                            }

                            let tableRowBackgroundColor = (
                                this.props.editor.selectedRelease
                                    ? this.props.editor.releases.indexOf(this.props.editor.selectedRelease) === index ? '#77a8ed' : undefined
                                    : undefined
                            );
                            return (
                                <TableRow hover key={index} onClick={this.onTableRowClick} data-index={index}
                                          style={{background: tableRowBackgroundColor}}>
                                    <TableCell>{release.clientVersion}</TableCell>
                                    <TableCell>{release.serverVersion}</TableCell>
                                    <TableCell>{release.releaseDate.toString()}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    private onTableRowClick = (event: MouseEvent<HTMLTableRowElement>) => {
        const selectediIndex = event.currentTarget.getAttribute('data-index');
        if(!this.props.editor) {
            throw Error('Ожидается ссылка на модель Editor');
        }

        this.props.editor.selectedRelease = this.props.editor.releases.find((release, index) => index === Number(selectediIndex))
    }
}