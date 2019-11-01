import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class ReleaseChangeTable extends Component {

    render() {
        return (
            <Paper >
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Тип изменения</TableCell>
                            <TableCell>Номер Jira</TableCell>
                            <TableCell>Описание</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{this.releases.map(release => (*/}
                        <TableRow >
                            <TableCell >{}</TableCell>
                            <TableCell >{}</TableCell>
                            <TableCell >{}</TableCell>
                        </TableRow>
                        {/*))}*/}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}