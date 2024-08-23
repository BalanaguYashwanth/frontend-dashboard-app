import React from 'react';
import './Dashboard.scss'
import Accordion from '../../common/components/Accordion/Accordion';

const Dashboard = () => {
    return (
        <main className='dashboard-container'>
            <table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Age, Sex</th>
                        <th>Condition</th>
                        <th>Date of upload</th>
                        <th>Files uploaded</th>
                        <th>Process status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <Accordion />
                            </td>
                        </tr>
                        <tr>
                            <td>2093</td>
                            <td>42, M</td>
                            <td>FrontendSOL</td>
                            <td>March 29, 2024. 4.28 PM</td>
                            <td>TestFileName</td>
                            <td>
                                Processing
                            </td>
                            <td>
                                View
                            </td>
                        </tr>
                    </tbody>
            </table>

        </main>
    )
}

export default Dashboard