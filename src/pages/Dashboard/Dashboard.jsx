import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Accordion from '../../common/components/Accordion/Accordion';
import CustomButton from '../../common/components/CustomButton/CustomButton';
import Tag from '../../common/components/Tag/Tag';
import { API_URL, decodeProcessStatus } from '../../common/constants';
import { fetchPatientRecords } from '../../common/api.services';
import './Dashboard.scss'

const socket = io(API_URL);
const Dashboard = () => {
    const [records, setRecords] = useState([]);

    const getFileNames = (files) => {
        if (files?.length > 0) {
            const fileNames = files.reduce((acc, file, index) => {
                if (index > 0) {
                    acc = acc + ' | ' + file?.name
                } else {
                    acc = acc + file?.name
                }
                return acc
            }, '')
            return fileNames
        }

    }

    const getPatientRecords = async () => {
        const { data } = await fetchPatientRecords();
        setRecords(data);
    }

    const updatePatientRecord = (updatedData) => {
        const { patientId, age, name, sex } = updatedData;
        setRecords((prevRecords) => {
            const index = prevRecords.findIndex(record => record._id === updatedData._id);
            if (index !== -1) {
                const newRecords = [...prevRecords];
                newRecords[index] = { ...prevRecords[index], patientId, age, name, sex };
                return newRecords;
            }
            return [...prevRecords, updatedData];
        });
    }

    useEffect(() => {
        getPatientRecords()
        socket.on('dataUpdatedRecords', (updatedData) => {
            updatePatientRecord(updatedData)
        });

        socket.on('dataUpdatedDisease', (updatedData) => {
            setRecords(prevRecords =>
                prevRecords.map(record => ({
                    ...record,
                    condition: {
                        ...record.condition,
                        name: updatedData.name
                    }
                }))
            );
        });

        socket.on('dataUpdatedPatientFiles', (updatedData) => {
            setRecords(prevRecords =>
                prevRecords.map(record => 
                    record.files._id === updatedData._id
                        ? {
                            ...record,
                            files: {
                                ...record.files,
                                fileUploadedDate: updatedData.fileUploadedDate,
                                files: updatedData.files
                            }
                        }
                        : record
                )
            );
        });

        return () => socket.off('dataUpdated');
    }, []);


    //todo - make this table reusable including headers
    return (
        <main className='dashboard-container-wrapper'>
            <section className='dashboard-container'>
                <table className='dark-blue-green'>
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
                            <td colSpan="7" className='dark-blue-green'>
                                <Accordion />
                            </td>
                        </tr>
                        {
                            records?.length > 0 && records.map(({ condition, patientId, age, sex, processStatus, files: PatientDoc }, index) => (
                                <tr key={`records-${index}`} className='records-list'>
                                    <td className='clr-white'>{patientId}</td>
                                    <td>{age}, {sex}</td>
                                    <td className='clr-white'>{condition?.name}</td>
                                    <td>{PatientDoc.fileUploadedDate}</td>
                                    <td>{getFileNames(PatientDoc?.files)}</td>
                                    <td>
                                        <Tag title={decodeProcessStatus[processStatus]} />
                                    </td>
                                    <td className='action-cell'>
                                        <img src="https://uat-vbexplore.brainsightai.com/img/download_icon2.f75eb645.svg" alt='download' />
                                        <img src="https://uat-vbexplore.brainsightai.com/img/report_icon2.edf631e0.svg" alt='report' />
                                        <CustomButton title="View" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Dashboard