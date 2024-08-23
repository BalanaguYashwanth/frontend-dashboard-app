import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Accordion from '../../common/components/Accordion/Accordion';
import { fetchPatientRecords } from '../../common/api.services';
import { API_URL, decodeProcessStatus } from '../../common/constants';
import './Dashboard.scss'

const socket = io(API_URL);
const Dashboard = () => {

    const [records, setRecords] = useState([]);

    const getPatientRecords = async () => {
        const { data } = await fetchPatientRecords();
        setRecords(data);
    }

    const updatePatientRecord = (updatedData) => {
        setRecords((prevRecords) => {
            const index = prevRecords.findIndex(record => record._id === updatedData._id);
            if (index !== -1) {
                const newRecords = [...prevRecords];
                newRecords[index] = updatedData;
                return newRecords;
            }
            return [...prevRecords, updatedData];
        });
    }

    useEffect(() => {
        getPatientRecords()
        socket.on('dataUpdated', (updatedData) => {
            updatePatientRecord(updatedData)
        });

        return () => socket.off('dataUpdated');
    }, []);


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
                    <tr style={{ margin: 'auto' }}>
                        <td colSpan="7">
                            <Accordion />
                        </td>
                    </tr>
                    {
                        records?.length > 0 && records.map(({ age, sex, processStatus }, index) => (
                            <tr key={`records-${index}`}>
                                <td>{index}</td>
                                <td>{age}, {sex}</td>
                                <td>FrontendSOL</td>
                                <td>March 29, 2024 <br /> 4.28 PM</td>
                                <td>TestFileName</td>
                                <td>
                                    {decodeProcessStatus[processStatus]}
                                </td>
                                <td className='flex-center'>
                                    <img src="https://uat-vbexplore.brainsightai.com/img/download_icon2.f75eb645.svg" alt='download' />
                                    <img src="https://uat-vbexplore.brainsightai.com/img/report_icon2.edf631e0.svg" alt='report' />
                                    View
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </main>
    )
}

export default Dashboard