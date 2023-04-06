import React, { Component } from 'react';
import $ from 'jquery';
import 'datatables.net-responsive';
import 'datatables.net-rowgroup';
import 'datatables.net-rowreorder';
import 'datatables.net';
import 'datatables.net-bs4';

class DataTable extends Component {
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable({
            responsive: true,
            stateSave: true,
            rowGroup: {
                dataSrc: 0
            },
            rowReorder: {
                selector: 'tr',
                update: false
            },
            columnDefs: [
                {
                    targets: [2, 3],
                    className: 'text-right'
                }
            ]
        });
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy(true);
    }

    render() {
        return (
            <table className="table" ref={el => (this.el = el)}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Developer</td>
                        <td>New York</td>
                        <td>$90,000</td>
                    </tr>
                    <tr>
                        <td>Jane Doe</td>
                        <td>Designer</td>
                        <td>Los Angeles</td>
                        <td>$80,000</td>
                    </tr>
                    <tr>
                        <td>Jim Smith</td>
                        <td>Manager</td>
                        <td>Chicago</td>
                        <td>$120,000</td>
                    </tr>
                    <tr>
                        <td>John Smith</td>
                        <td>Developer</td>
                        <td>New York</td>
                        <td>$100,000</td>
                    </tr>
                    <tr>
                        <td>Joan Smith</td>
                        <td>Designer</td>
                        <td>Los Angeles</td>
                        <td>$90,000</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Salary</th>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

export default DataTable;
