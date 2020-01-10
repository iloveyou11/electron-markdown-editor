import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onFileDelete, onFileSave }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const closeSearch = () => {
    setEditStatus(false)
    setValue('')
  }

  // 响应键盘事件
  useEffect(() => {
    if (enterPressed && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onFileSave(editItem.id, value)
      setEditStatus(false)
      setValue('')
    }
    if (escPressed && editStatus) {
      closeSearch()
    }
    // const handleInputEvent = e => {
    //   const { keyCode } = e
    //   if (keyCode === 13 && editStatus) {//enter
    //     const editItem = files.find(file => file.id === editStatus)
    //     onFileSave(editItem.id, value)
    //     setEditStatus(false)
    //     setValue('')
    //   } else if (keyCode === 27) {//esc
    //     closeSearch(e)
    //   }
    // }
    // document.addEventListener('keyup', handleInputEvent)
    // return () => {
    //   document.removeEventListener('keyup', handleInputEvent)
    // }
  })


  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file =>
          <li
            className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
            key={file.id}
            data-id={file.id}
            data-title={file.title}
          >
            {(file.id !== editStatus) &&
              <>
                < span className="col-2">
                  <FontAwesomeIcon icon={faMarkdown} />
                </span>
                <span
                  className="col-6 c-link"
                  onClick={() => { onFileClick(file.id) }}
                >
                  {file.title}
                </span>
                <button
                  type="button"
                  className="icon-btn col-2"
                  onClick={() => { setEditStatus(file.id); setValue(file.title) }}
                >
                  <FontAwesomeIcon icon={faEdit} title="编辑" />
                </button>
                <button
                  type="button"
                  className="icon-btn col-2"
                  onClick={() => { onFileDelete(file.id) }}
                >
                  <FontAwesomeIcon icon={faTrash} title="删除" />
                </button>
              </>
            }
            {
              file.id === editStatus &&
              <>
                <input
                  type="text"
                  value={value}
                  className="col-10"
                  onChange={e => { setValue(e.target.value) }}
                />
                <button type="button" className="icon-btn col-2" onClick={closeSearch}>
                  <FontAwesomeIcon icon={faTimes} title="关闭" size="lg" />
                </button>
              </>
            }
          </li>
        )
      }
    </ul >
  )
}

FileList.propTypes = {
  file: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onFileSave: PropTypes.func,
}

export default FileList