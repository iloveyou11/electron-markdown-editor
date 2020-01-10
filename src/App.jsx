import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";

import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css";
import './App.css'

import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch.jsx'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'

const App = () => {
    const [files, setFiles] = useState(defaultFiles)
    const [activeFileId, setActiveFileId] = useState('')
    const [openedFileIDs, setOpenedFileIDs] = useState([])
    const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
    const openedFiles = openedFileIDs && openedFileIDs.map(openId => {
        return files.find(file => file.id === openId)
    })
    const activedFile = files.find(file => file.id === activeFileId)
    const fileSearch = value => {
        const newFiles = files.filter(file => file.title.includes(value))
        setFiles(newFiles)
    }
    const fileClick = fileId => {
        setActiveFileId(fileId)
        if (!openedFileIDs.includes(fileId)) {
            setOpenedFileIDs([...openedFileIDs, fileId])
        }
    }
    const tabClick = fileId => {
        setActiveFileId(fileId)
    }
    const tabClose = id => {
        const otherTabs = openedFileIDs.find(fileId => fileId !== id)
        setOpenedFileIDs(otherTabs)
        console.log(otherTabs);

        if (otherTabs.length > 0) {
            setActiveFileId(otherTabs[0])
        } else {
            setActiveFileId('')
        }
    }
    const fileChange = (id, value) => {
        const newFiles = files.map(file => {
            if (file.id === id) {
                file.body = value
            }
            return file
        })
        setFiles(newFiles)
        if (!unsavedFileIDs.includes(id)) {
            setUnsavedFileIDs([...unsavedFileIDs, id])
        }
    }
    const clickCreateFile = () => {

    }
    const fileDelete = fileId => {

    }

    return (
        <div className="container-fluid px-0">
            <div className="row no-gutters">
                <div className="col-3 left-panel">
                    <FileSearch onFileSearch={fileSearch} />
                    <FileList
                        files={files}
                        onFileClick={fileClick}
                        onFileDelete={() => { }}
                        onFileSave={() => { }}
                    />
                    <div className="row no-gutters button-group">
                        <div className="col">
                            <BottomBtn
                                text="新建"
                                colorClass="btn-primary"
                                icon={faPlus}
                            />
                        </div>
                        <div className="col">
                            <BottomBtn
                                text="导入"
                                colorClass="btn-success"
                                icon={faFileImport}
                            /></div>
                    </div>
                </div>
                <div className="col-9 right-panel">
                    {!activeFileId &&
                        <div className="start-page">
                            选择或者创建新的markdown文档
                        </div>
                    }
                    {activeFileId &&
                        <>
                            <TabList
                                files={openedFiles}
                                unsaveIds={unsavedFileIDs}
                                activeId={activeFileId}
                                onTabClick={tabClick}
                                onTabClose={tabClose}
                            />
                            <SimpleMDE
                                key={activedFile && activedFile.id}
                                value={activedFile.body}
                                onChange={value => { fileChange(activedFile.id, value) }}
                                options={{
                                    minHeight: '450px'
                                }}
                            />;
                    </>
                    }

                </div>
            </div>
        </div>
    )
}


export default App 